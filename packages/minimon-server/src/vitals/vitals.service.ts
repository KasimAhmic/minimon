import { Inject, Injectable } from '@nestjs/common';
import { timed, toMillis } from '../common/time.util';
import * as si from 'systeminformation';
import {
  CpuVitals,
  GpuVitals,
  NetworkVitals,
  RamVitals,
  SystemVitals,
  DebugInfo,
  VitalsData,
  roundFloat,
  ByteUtil,
} from '@ahmic/minimon-core';
import { DEFAULT_NETWORK_INTERFACE } from './vitals.constants';
import { DefaultNetworkInterface } from './network-interface.provider';
import { EventsService } from '../events/events.service';
import { VitalsEvent } from './vitals.event';
import { SchedulerRegistry } from '@nestjs/schedule';
import { OnEvent } from '@nestjs/event-emitter';
import { INTERVAL_UPDATED } from '../settings/settings.constants';

@Injectable()
export class VitalsService {
  private readonly INTERVAL_NAME = VitalsService.name + 'Interval';

  private vitals: SystemVitals;

  constructor(
    @Inject(DEFAULT_NETWORK_INTERFACE)
    private readonly defaultNetworkInterface: DefaultNetworkInterface,
    private readonly eventsService: EventsService,
    private readonly schedulerRegistry: SchedulerRegistry,
  ) {}

  async startPoller(interval: number) {
    const job = setInterval(() => this.updateVitals(), interval);

    this.schedulerRegistry.addInterval(this.INTERVAL_NAME, job);
  }

  @OnEvent(INTERVAL_UPDATED)
  private handleIntervalUpdated(interval: number) {
    this.schedulerRegistry.deleteInterval(this.INTERVAL_NAME);

    this.startPoller(interval);
  }

  getVitals(): SystemVitals {
    return this.vitals;
  }

  private setVitals(vitals: SystemVitals): void {
    this.vitals = vitals;

    this.eventsService.emitEvent(new VitalsEvent(vitals));
  }

  private createVitals(currentValue: number, minValue: number, maxValue: number, label: string): VitalsData {
    return { currentValue, minValue, maxValue, label };
  }

  async updateVitals(): Promise<void> {
    const [cpu, cpuVitalsProcessingTime] = await timed<CpuVitals>(() => this.getCpuVitals());
    const [ram, ramVitalsProcessingTime] = await timed<RamVitals>(() => this.getRamVitals());
    const [gpu, gpuVitalsProcessingTime] = await timed<GpuVitals>(() => this.getGpuVitals());
    const [network, networkVitalsProcessingTime] = await timed<NetworkVitals>(() => this.getNetworkVitals());

    const debugInfo: DebugInfo = {
      timestamp: new Date().toISOString(),
      cpuVitalsProcessingTime: toMillis(cpuVitalsProcessingTime),
      ramVitalsProcessingTime: toMillis(ramVitalsProcessingTime),
      gpuVitalsProcessingTime: toMillis(gpuVitalsProcessingTime),
      networkVitalsProcessingTime: toMillis(networkVitalsProcessingTime),
      totalProcessingTime: toMillis(
        cpuVitalsProcessingTime +
          ramVitalsProcessingTime +
          gpuVitalsProcessingTime +
          networkVitalsProcessingTime,
      ),
    };

    this.setVitals({ cpu, ram, gpu, network, debugInfo });
  }

  private async getCpuVitals(): Promise<CpuVitals> {
    const load = await si.currentLoad();
    const speed = await si.cpuCurrentSpeed();
    const temp = await si.cpuTemperature();

    const coreCount = load.cpus.length;
    const currentLoad = roundFloat(load.currentLoad);
    const currentSpeed = speed.avg ?? 0;
    const currentTemp = temp.main ?? 0;

    return {
      coreCount: this.createVitals(coreCount, 0, coreCount, `${coreCount}`),
      currentLoad: this.createVitals(currentLoad, 0, 100, `${currentLoad}%`),
      currentSpeed: this.createVitals(currentSpeed, 0, 0, `${currentSpeed}`),
      currentTemp: this.createVitals(currentTemp, 0, 100, `${currentTemp}°C`),
    };
  }

  private async getRamVitals(): Promise<RamVitals> {
    const ram = await si.mem();

    const usedMemory = roundFloat(ByteUtil.bytes(ram.active).toGigabytes());
    const freeMemory = roundFloat(ByteUtil.bytes(ram.available).toGigabytes());
    const totalMemory = roundFloat(ByteUtil.bytes(ram.total).toGigabytes());

    return {
      usedMemory: this.createVitals(usedMemory, 0, totalMemory, `${usedMemory} GB`),
      freeMemory: this.createVitals(freeMemory, 0, totalMemory, `${freeMemory} GB`),
    };
  }

  private async getGpuVitals(): Promise<GpuVitals> {
    const { controllers } = await si.graphics();

    const gpu = controllers[0];

    const fanSpeed = gpu?.fanSpeed ?? 0;
    const memoryTotal = gpu?.memoryTotal ?? 1;
    const memoryUsed = gpu?.memoryUsed ?? 0;
    const memoryFree = gpu?.memoryFree ?? 0;
    const powerDraw = gpu?.powerDraw ?? 0;
    const powerLimit = gpu?.powerLimit ?? 1;
    const clockCore = gpu?.clockCore ?? 0;
    const clockMemory = gpu?.clockMemory ? gpu.clockMemory / 1000 : 0;
    const temperatureGpu = gpu?.temperatureGpu ?? 0;
    const utilizationGpu = gpu?.utilizationGpu ?? 0;

    return {
      fanSpeed: this.createVitals(fanSpeed, 0, 5000, `${fanSpeed} RPM`),
      memoryUsed: this.createVitals(memoryUsed, 0, memoryTotal, `${memoryUsed} GB`),
      memoryFree: this.createVitals(memoryFree, 0, memoryTotal, `${memoryFree} GB`),
      powerDraw: this.createVitals(powerDraw, 0, powerLimit, `${powerDraw} W`),
      clockCore: this.createVitals(clockCore, 0, 3, `${clockCore} GHz`),
      clockMemory: this.createVitals(clockMemory, 0, 10, `${clockMemory} GHz`),
      temperatureGpu: this.createVitals(temperatureGpu, 0, 100, `${temperatureGpu}°C`),
      utilizationGpu: this.createVitals(utilizationGpu, 0, 100, `${utilizationGpu}%`),
    };
  }

  private async getNetworkVitals(): Promise<NetworkVitals> {
    const { name, speed } = this.defaultNetworkInterface;

    const maxSpeed = ByteUtil.bytes(speed).toMegabits();

    const network = (await si.networkStats(name))[0];

    const uploadBytesPerSecond = network.tx_sec;
    const downloadBytesPerSecond = network.rx_sec;
    const usagePercentage = ((uploadBytesPerSecond + downloadBytesPerSecond) / speed) * 100;

    const upload = roundFloat(ByteUtil.bytes(uploadBytesPerSecond ?? 0).toMegabits());
    const download = roundFloat(ByteUtil.bytes(downloadBytesPerSecond ?? 0).toMegabits());
    const usage = roundFloat(usagePercentage);

    return {
      upload: this.createVitals(upload, 0, maxSpeed, `${upload} Mbps`),
      download: this.createVitals(download, 0, maxSpeed, `${download} Mbps`),
      usage: this.createVitals(usage, 0, 100, `${usage}%`),
    };
  }
}
