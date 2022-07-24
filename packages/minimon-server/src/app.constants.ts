import { join } from 'node:path';

export const DEVELOPMENT_CLIENT_DIR = join(__dirname, '..', '..', 'minimon-client', 'build');
export const PRODUCTION_CLIENT_DIR = join(__dirname, 'client');
export const CLIENT_DIR =
  process.env.NODE_ENV === 'development' ? DEVELOPMENT_CLIENT_DIR : PRODUCTION_CLIENT_DIR;
