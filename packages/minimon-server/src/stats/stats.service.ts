import { Inject, Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { timed, toMillis } from '../common/time.util';
import * as si from 'systeminformation';
import {
  CpuStats,
  GpuStats,
  NetworkStats,
  RamStats,
  SystemStats,
  defaultSystemStats,
} from '@ahmic/minimon-core';
import { DEFAULT_NETWORK_INTERFACE } from './stats.constants';
import { DefaultNetworkInterface } from './network-interface.provider';
import { Metadata } from '@ahmic/minimon-core/metadata';

export interface SystemStatsMessage {
  data: SystemStats;
}

@Injectable()
export class StatsService {
  private readonly stats: BehaviorSubject<SystemStatsMessage>;
  private readonly defaultNetworkInterfaceName: string;
  private readonly defaultNetworkInterfaceSpeed: number;

  constructor(@Inject(DEFAULT_NETWORK_INTERFACE) defaultNetworkInterface: DefaultNetworkInterface) {
    this.stats = new BehaviorSubject<SystemStatsMessage>({ data: defaultSystemStats });
    this.defaultNetworkInterfaceName = defaultNetworkInterface.name;
    this.defaultNetworkInterfaceSpeed = defaultNetworkInterface.speed;
  }

  getStats(): SystemStats {
    return this.stats.getValue().data;
  }

  subscribe(): Observable<SystemStatsMessage> {
    return this.stats.asObservable();
  }

  async updateStats(): Promise<void> {
    const [cpu, cpuStatsProcessingTime] = await timed<CpuStats>(() => this.getCpuStats());
    const [ram, ramStatsProcessingTime] = await timed<RamStats>(() => this.getRamStats());
    const [gpu, gpuStatsProcessingTime] = await timed<GpuStats>(() => this.getGpuStats());
    const [network, networkStatsProcessingTime] = await timed<NetworkStats>(() => this.getNetworkStats());

    const metadata: Metadata = {
      timestamp: new Date().toISOString(),
      cpuStatsProcessingTime: toMillis(cpuStatsProcessingTime),
      ramStatsProcessingTime: toMillis(ramStatsProcessingTime),
      gpuStatsProcessingTime: toMillis(gpuStatsProcessingTime),
      networkStatsProcessingTime: toMillis(networkStatsProcessingTime),
      totalProcessingTime: toMillis(
        cpuStatsProcessingTime + ramStatsProcessingTime + gpuStatsProcessingTime + networkStatsProcessingTime,
      ),
    };

    this.stats.next({ data: { cpu, ram, gpu, network, metadata } });
  }

  private async getCpuStats(): Promise<CpuStats> {
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

  private async getRamStats(): Promise<RamStats> {
    const ram = await si.mem();

    const usedMemory = (ram.used / ram.total) * 100;
    const freeMemory = (ram.available / ram.total) * 100;
    const totalMemory = ram.total;

    return { usedMemory, freeMemory, totalMemory };
  }

  private async getGpuStats(): Promise<GpuStats> {
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

  private async getNetworkStats(): Promise<NetworkStats> {
    const network = (await si.networkStats(this.defaultNetworkInterfaceName))[0];

    const upload = network.tx_sec;
    const download = network.rx_sec;
    const usage = (upload + download) / this.defaultNetworkInterfaceSpeed;

    return { upload, download, usage };
  }
}
