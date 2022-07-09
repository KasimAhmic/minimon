import { DEFAULT_NETWORK_INTERFACE } from './stats.constants';
import * as si from 'systeminformation';
import { Provider } from '@nestjs/common';

export type DefaultNetworkInterface = {
  name: string;
  speed: number;
};

export const networkInterfaceProvider: Provider = {
  provide: DEFAULT_NETWORK_INTERFACE,
  useFactory: async (): Promise<DefaultNetworkInterface> => {
    const defaultInterfaceName = await si.networkInterfaceDefault();
    const interfaces = await si.networkInterfaces();

    const defaultInterface = interfaces.find((iface) => iface.iface === defaultInterfaceName);

    const name = defaultInterface.ifaceName;
    const speed = defaultInterface.speed * 1000;

    return { name, speed };
  },
};
