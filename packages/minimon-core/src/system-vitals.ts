import { DebugInfo } from './debug-info';

export type CpuVitalProperty = 'currentLoad' | 'coreCount' | 'currentSpeed' | 'currentTemp';
export type RamVitalProperty = 'usedMemory' | 'freeMemory';
export type GpuVitalProperty =
  | 'fanSpeed'
  | 'memoryUsed'
  | 'memoryFree'
  | 'powerDraw'
  | 'clockCore'
  | 'clockMemory'
  | 'temperatureGpu'
  | 'utilizationGpu';
export type NetworkVitalProperty = 'upload' | 'download' | 'usage';

export type CpuVitals = Record<CpuVitalProperty, VitalsData>;
export type RamVitals = Record<RamVitalProperty, VitalsData>;
export type GpuVitals = Record<GpuVitalProperty, VitalsData>;
export type NetworkVitals = Record<NetworkVitalProperty, VitalsData>;

export interface VitalsData {
  currentValue: number;
  minValue: number;
  maxValue: number;
  label: string;
}

export interface SystemVitals {
  cpu: CpuVitals;
  ram: RamVitals;
  gpu: GpuVitals;
  network: NetworkVitals;
  debugInfo: DebugInfo;
}

export type SystemVitalType = keyof Omit<SystemVitals, 'debugInfo'>;

const empty: VitalsData = {
  currentValue: 0,
  minValue: 0,
  maxValue: 0,
  label: '',
};

export const defaultSystemVitals: SystemVitals = {
  cpu: {
    currentLoad: empty,
    coreCount: empty,
    currentSpeed: empty,
    currentTemp: empty,
  },
  ram: {
    usedMemory: empty,
    freeMemory: empty,
  },
  gpu: {
    fanSpeed: empty,
    memoryUsed: empty,
    memoryFree: empty,
    powerDraw: empty,
    clockCore: empty,
    clockMemory: empty,
    temperatureGpu: empty,
    utilizationGpu: empty,
  },
  network: {
    upload: empty,
    download: empty,
    usage: empty,
  },
  debugInfo: {
    timestamp: '0ms',
    cpuVitalsProcessingTime: '0ms',
    ramVitalsProcessingTime: '0ms',
    gpuVitalsProcessingTime: '0ms',
    networkVitalsProcessingTime: '0ms',
    totalProcessingTime: '0ms',
  },
};
