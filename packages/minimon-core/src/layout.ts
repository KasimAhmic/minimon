import {
  SystemVitalType,
  CpuVitalProperty,
  GpuVitalProperty,
  NetworkVitalProperty,
  RamVitalProperty,
} from './system-vitals';

export type Widget = {
  vital: SystemVitalType;
  label: string;
} & (
  | { vital: 'cpu'; property: CpuVitalProperty }
  | { vital: 'ram'; property: RamVitalProperty }
  | { vital: 'gpu'; property: GpuVitalProperty }
  | { vital: 'network'; property: NetworkVitalProperty }
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
    { label: 'CPU Load', vital: 'cpu', property: 'currentLoad' },
    { label: 'RAM Used', vital: 'ram', property: 'usedMemory' },
    { label: 'GPU Load', vital: 'gpu', property: 'utilizationGpu' },
    { label: 'LAN Load', vital: 'network', property: 'usage' },
    { label: 'GPU Power', vital: 'gpu', property: 'powerDraw' },
    { label: 'GPU Temp', vital: 'gpu', property: 'temperatureGpu' },
  ],
};
