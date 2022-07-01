import { Injectable } from '@nestjs/common';
import { BehaviorSubject, Observable } from 'rxjs';
import { timed } from './common/time.util';
import * as si from 'systeminformation';
import { CpuStats, GpuStats, RamStats, SystemStats, defaultSystemStats } from '@ahmic/minimon-core';

export interface SystemStatsMessage {
  data: SystemStats;
}

@Injectable()
export class AppService {
  private readonly stats: BehaviorSubject<SystemStatsMessage>;

  constructor() {
    this.stats = new BehaviorSubject<SystemStatsMessage>({ data: defaultSystemStats });
  }

  getStats(): SystemStats {
    return this.stats.getValue().data;
  }

  subscribe(): Observable<SystemStatsMessage> {
    return this.stats.asObservable();
  }

  async updateStats(): Promise<void> {
    let cpu: CpuStats;
    let ram: RamStats;
    let gpu: GpuStats;

    const processingTime = await timed(async () => {
      cpu = await this.getCpuStats();
      ram = await this.getRamStats();
      gpu = await this.getGpuStats();
    });

    const timestamp = new Date().toLocaleString();

    this.stats.next({ data: { timestamp, processingTime, cpu, ram, gpu } });
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

    const usedMemory = ram.used;
    const freeMemory = ram.available;
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
}
