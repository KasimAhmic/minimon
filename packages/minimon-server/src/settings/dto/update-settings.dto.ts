import { Settings } from '@ahmic/minimon-core';
import { SettingsDto } from './settings.dto';
import { PartialType } from '@nestjs/mapped-types';

export class UpdateSettingsDto extends PartialType<Settings>(SettingsDto) {}
