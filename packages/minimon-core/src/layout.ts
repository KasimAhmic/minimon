import { CpuVitals } from './cpu-vitals';
import { NetworkVitals } from './network-vitals';
import { RamVitals } from './ram-vitals';
import { GpuVitals } from './gpu-vitals';

export type Widget =
  | { component: 'cpu'; property: keyof CpuVitals }
  | { component: 'ram'; property: keyof RamVitals }
  | { component: 'gpu'; property: keyof GpuVitals }
  | { component: 'network'; property: keyof NetworkVitals };

export interface Layout {
  horizontalCount: number;
  verticalCount: number;
  widgets: (Widget | null)[];
}

export const defaultLayout: Layout = {
  horizontalCount: 3,
  verticalCount: 2,
  widgets: [
    { component: 'cpu', property: 'currentLoad' },
    { component: 'ram', property: 'usedMemory' },
    { component: 'gpu', property: 'utilizationGpu' },
    { component: 'network', property: 'usage' },
    null,
    { component: 'gpu', property: 'temperatureGpu' },
  ],
};
