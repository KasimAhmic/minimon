import { CpuVitals } from './cpu-vitals';
import { NetworkVitals } from './network-vitals';
import { RamVitals } from './ram-vitals';
import { GpuVitals } from './gpu-vitals';

export type Widget = {
  label: string;
} & (
  | { component: 'cpu'; property: keyof CpuVitals }
  | { component: 'ram'; property: keyof RamVitals }
  | { component: 'gpu'; property: keyof GpuVitals }
  | { component: 'network'; property: keyof NetworkVitals }
);

export interface Layout {
  columns: number;
  rows: number;
  widgets: (Widget | null)[];
}

export const defaultLayout: Layout = {
  columns: 3,
  rows: 2,
  widgets: [
    { label: 'CPU Load', component: 'cpu', property: 'currentLoad' },
    { label: 'RAM Used', component: 'ram', property: 'usedMemory' },
    { label: 'GPU Load', component: 'gpu', property: 'utilizationGpu' },
    { label: 'LAN Load', component: 'network', property: 'usage' },
    { label: 'GPU Power', component: 'gpu', property: 'powerUsage' },
    { label: 'GPU Temp', component: 'gpu', property: 'temperatureGpu' },
  ],
};
