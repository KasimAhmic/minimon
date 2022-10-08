import { Layout, MinimonTheme, Settings, ThemeMode, Widget } from '@ahmic/minimon-core';
import Joi from 'joi';

export const INTERVAL_UPDATED = 'settings.intervalUpdated';
export const SETTINGS_FILE = 'SETTINGS_FILE';

export const settingsValidationSchema = Joi.object<Settings, true>({
  clickToReload: Joi.boolean(),
  showDebugScreen: Joi.boolean(),
  themeMode: Joi.string().valid(...Object.values(ThemeMode)),
  pollingInterval: Joi.number().greater(300),
  // A typing bug in Joi is preventing us from using nested Joi.StrictSchemaMap types.
  //
  // Issue: https://github.com/sideway/joi/issues/2764
  // PR:    https://github.com/sideway/joi/pull/2627
  //
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  layout: Joi.object<Layout, true>({
    columns: Joi.number().greater(0),
    rows: Joi.number().greater(0),
    widgets: Joi.array().items(
      Joi.object<Widget, true>({
        label: Joi.string(),
        vital: Joi.string(),
        property: Joi.string(),
      }),
    ),
  }),
  // eslint-disable-next-line @typescript-eslint/ban-ts-comment
  // @ts-ignore
  theme: Joi.object<MinimonTheme, true>({
    backgroundColor: Joi.string().min(0),
    dialColor: Joi.string().min(0),
    dialLabelFontColor: Joi.string().min(0),
    dialLabelFontSize: Joi.string().min(0),
    dialValueFontColor: Joi.string().min(0),
    dialValueFontSize: Joi.string().min(0),
  }),
});
