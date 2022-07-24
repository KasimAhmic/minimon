import Joi from 'joi';

export interface MinimonConfig {
  HOST: string;
  PORT: number;
}

export const MinimonConfigSchema = Joi.object<MinimonConfig, true>({
  HOST: Joi.string().default('localhost'),
  PORT: Joi.number().default(8080),
});
