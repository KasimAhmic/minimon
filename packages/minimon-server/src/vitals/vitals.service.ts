import { Inject, Injectable } from '@nestjs/common';
import { timed, toMillis } from '../common/time.util';
import * as si from 'systeminformation';
import { CpuVitals, GpuVitals, NetworkVitals, RamVitals, SystemVitals } from '@ahmic/minimon-core';
import { DEFAULT_NETWORK_INTERFACE } from './vitals.constants';
import { DefaultNetworkInterface } from './network-interface.provider';
import { Metadata } from '@ahmic/minimon-core/metadata';
import { EventsService } from 'events/events.service';
import { VitalsEvent } from './vitals.event';
import { SchedulerRegistry } from '@nestjs/schedule';
import { OnEvent } from '@nestjs/event-emitter';
import { INTERVAL_UPDATED } from 'settings/settings.constants';

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

  async updateVitals(): Promise<void> {
    const [cpu, cpuVitalsProcessingTime] = await timed<CpuVitals>(() => this.getCpuVitals());
    const [ram, ramVitalsProcessingTime] = await timed<RamVitals>(() => this.getRamVitals());
    const [gpu, gpuVitalsProcessingTime] = await timed<GpuVitals>(() => this.getGpuVitals());
    const [network, networkVitalsProcessingTime] = await timed<NetworkVitals>(() => this.getNetworkVitals());

    const metadata: Metadata = {
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

    this.setVitals({ cpu, ram, gpu, network, metadata });
  }

  private async getCpuVitals(): Promise<CpuVitals> {
    const load = await si.currentLoad();
    const speed = await si.cpuCurrentSpeed();
    const temp = await si.cpuTemperature();

    const coreCount = load.cpus.length;
    const currentLoad = load.currentLoad;
    const currentSpeed = speed.avg ?? 0;
    const currentTemp = temp.main ?? 0;
    const maxTemp = temp.max ?? 0;

    return { currentLoad, coreCount, currentSpeed, currentTemp, maxTemp };
  }

  private async getRamVitals(): Promise<RamVitals> {
    const ram = await si.mem();

    const usedMemory = (ram.used / ram.total) * 100;
    const freeMemory = (ram.available / ram.total) * 100;
    const totalMemory = ram.total;

    return { usedMemory, freeMemory, totalMemory };
  }

  private async getGpuVitals(): Promise<GpuVitals> {
    const { controllers } = await si.graphics();

    const gpu = controllers[0];

    const fanSpeed = gpu.fanSpeed;
    const memoryTotal = gpu.memoryTotal;
    const memoryUsed = gpu.memoryUsed;
    const memoryFree = gpu.memoryFree;
    const powerDraw = gpu.powerDraw;
    const powerLimit = gpu.powerLimit;
    const clockCore = gpu.clockCore;
    const clockMemory = gpu.clockMemory;
    const temperatureGpu = gpu.temperatureGpu ?? 0;
    const utilizationGpu = gpu.utilizationGpu ?? 0;

    return {
      fanSpeed,
      memoryTotal,
      memoryUsed,
      memoryFree,
      powerDraw,
      powerLimit,
      clockCore,
      clockMemory,
      temperatureGpu,
      utilizationGpu,
    };
  }

  private async getNetworkVitals(): Promise<NetworkVitals> {
    const { name, speed } = this.defaultNetworkInterface;

    const network = (await si.networkStats(name))[0];

    const upload = network.tx_sec;
    const download = network.rx_sec;
    const usage = (upload + download) / speed;

    return { upload, download, usage };
  }
}
