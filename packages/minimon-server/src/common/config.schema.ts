import * as Joi from 'joi';

export interface PiMonConfig {
  HOST: string;
  PORT: number;
  POLLING_INTERVAL: number;
}

export const piMonConfigSchema = Joi.object<PiMonConfig, true>({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().default(8081),
  POLLING_INTERVAL: Joi.number().default(1000),
});
