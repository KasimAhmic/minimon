import Joi from 'joi';
import { program } from 'commander';

export interface MinimonConfig {
  HOST: string;
  PORT: number;
}

const defaultHost = 'localhost';
const defaultPort = 8080;

export const configLoader = (): MinimonConfig => {
  program.option('--host <value>').option('--port <value>');

  const options = program.parse(process.argv).opts();

  const validatedHost = Joi.string().ip().default(defaultHost).validate(options.host);
  const validatedPort = Joi.number().min(0).max(65535).default(defaultPort).validate(options.port);

  return {
    HOST: validatedHost.value,
    PORT: validatedPort.value,
  };
};
