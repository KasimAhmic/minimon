import { DEFAULT_NETWORK_INTERFACE } from './stats.constants';
import * as si from 'systeminformation';

export type DefaultNetworkInterface = {
  name: string;
  speed: number;
};

export const networkInterfaceProvider = {
  provide: DEFAULT_NETWORK_INTERFACE,
  useFactory: async (): Promise<DefaultNetworkInterface> => {
    const interfaces = await si.networkInterfaces();

    // @ts-ignore
    const defaultInterface = interfaces.find((iface) => iface.default);

    const name = defaultInterface.ifaceName;
    const speed = defaultInterface.speed * 1000;

    return { name, speed };
  },
};
