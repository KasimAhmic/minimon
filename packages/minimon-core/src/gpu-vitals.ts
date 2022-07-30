export interface GpuVitals {
  fanSpeed: number;
  memoryTotal: number;
  memoryUsed: number;
  memoryFree: number;
  powerDraw: number;
  powerLimit: number;
  clockCore: number;
  clockMemory: number;
  temperatureGpu: number;
  utilizationGpu: number;
}
