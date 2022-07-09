import { CpuVitals } from './cpu.vitals';
import { GpuVitals } from './gpu.vitals';
import { Metadata } from './metadata';
import { NetworkVitals } from './network.vitals';
import { RamVitals } from './ram.vitals';

export interface SystemVitals {
  cpu: CpuVitals;
  ram: RamVitals;
  gpu: GpuVitals;
  network: NetworkVitals;
  metadata: Metadata;
}

export const defaultSystemStats: SystemVitals = {
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
  network: {
    upload: 0,
    download: 0,
    usage: 0,
  },
  metadata: {
    timestamp: '0ms',
    cpuStatsProcessingTime: '0ms',
    ramStatsProcessingTime: '0ms',
    gpuStatsProcessingTime: '0ms',
    networkStatsProcessingTime: '0ms',
    totalProcessingTime: '0ms',
  },
};
