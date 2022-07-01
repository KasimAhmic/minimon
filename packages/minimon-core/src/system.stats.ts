import { CpuStats } from './cpu.stats';
import { GpuStats } from './gpu.stats';
import { RamStats } from './ram.stats';

export interface SystemStats {
  timestamp: string;
  processingTime: string;
  cpu: CpuStats;
  ram: RamStats;
  gpu: GpuStats;
}

export const defaultSystemStats: SystemStats = {
  timestamp: '',
  processingTime: '',
  cpu: {
    currentLoad: 0,
    coreCount: 0,
    currentSpeed: 0,
    currentTemp: 0,
    maxTemp: 0,
  },
  ram: {
    usedMemory: 0,
    freeMemory: 0,
    totalMemory: 0,
  },
  gpu: {
    fanSpeed: 0,
    memoryTotal: 0,
    memoryUsed: 0,
    memoryFree: 0,
    powerDraw: 0,
    powerLimit: 0,
    clockCore: 0,
    clockMemory: 0,
    temperatureGpu: 0,
    utilizationGpu: 0,
  },
};
