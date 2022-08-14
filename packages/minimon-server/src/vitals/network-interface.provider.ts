import { DEFAULT_NETWORK_INTERFACE } from './vitals.constants';
import * as si from 'systeminformation';
import { Provider } from '@nestjs/common';
import { ByteUtil } from '@ahmic/minimon-core';

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
    const speed = ByteUtil.megabits(defaultInterface.speed).toBytes();

    return { name, speed };
  },
};
