import React, { FC } from 'react';
import { Button, ButtonGroup, FormControlLabel, Paper, Switch, Typography } from '@mui/material';
import { LoadingButton } from '@mui/lab';
import { Header } from 'components/Header';
import { makeStyles } from 'tss-react/mui';
import { useSettingsSelector, useUpdateSettings, useReloadClients, useResetSettings } from 'hooks';
import { ThemeMode } from '@ahmic/minimon-core';
import { SubmitTextField } from 'components/SubmitTextField';

const headerHeight = 64;

export const useStyles = makeStyles()((theme) => ({
  root: {
    width: '100%',
    height: `calc(100% - ${headerHeight}px)`,
    marginTop: headerHeight,
    padding: theme.spacing(1),
    backgroundColor: theme.palette.background.paper,
  },
  paper: {
    display: 'flex',
    flexDirection: 'column',
    gap: theme.spacing(1),
    width: '100%',
    height: '100%',
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    background: theme.palette.background.default,
    overflowY: 'auto',
  },
  header: {
    padding: theme.spacing(2),
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
    backgroundColor: theme.palette.background.paper,
  },
  title: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  section: {
    width: '100%',
    maxWidth: 1000,
    margin: '0 auto',
    padding: theme.spacing(2),
  },
  sectionTitle: {
    position: 'sticky',
    top: 0,
    padding: theme.spacing(1),
    background: theme.palette.background.default,
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
    zIndex: theme.zIndex.tooltip,
  },
  settings: {
    marginTop: theme.spacing(1),
    borderWidth: 1,
    borderStyle: 'solid',
    borderColor: theme.palette.divider,
    borderRadius: (theme.shape.borderRadius as number) * 2,
    backgroundColor: theme.palette.background.paper,
  },
  setting: {
    display: 'grid',
    gridTemplateColumns: '1fr 250px',
    borderBottomWidth: 1,
    borderBottomStyle: 'solid',
    borderBottomColor: theme.palette.divider,
    '&:last-of-type': {
      borderBottomWidth: 0,
    },
  },
  settingInformation: {
    padding: theme.spacing(2),
  },
  settingTitle: {
    fontWeight: theme.typography.fontWeightMedium,
  },
  settingControl: {
    display: 'flex',
    alignItems: 'center',
    padding: theme.spacing(2),
  },
}));

export const Admin: FC = () => {
  const { classes } = useStyles();

  const settings = useSettingsSelector((settings) => settings);

  const [updateSettings, { isLoading: isUpdateSettingsLoading }] = useUpdateSettings();
  const [resetSettings, { isLoading: isResetSettingsLoading }] = useResetSettings();
  const [reloadClients, { isLoading: isReloadClientsLoading }] = useReloadClients();

  return (
    <div className={classes.root}>
      <Header />

      <Paper elevation={4} className={classes.paper}>
        <div className={classes.header}>
          <Typography variant='h4' className={classes.title}>
            Settings
          </Typography>

          <Typography>
            You can tweak various settings for Minimon below. All changes will be applied immediatley
          </Typography>
        </div>

        <section className={classes.section}>
          <Typography variant='h5' className={classes.sectionTitle}>
            General
          </Typography>

          <div className={classes.settings}>
            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Click to Reload</Typography>
                <Typography variant='body2'>
                  Enables clicking/tapping anywhere on the Dashboard screen to reload the page. Useful for
                  devices where you might not constantly have keyboard and mouse access to.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.clickToReload}
                      onChange={(e) => updateSettings({ clickToReload: e.target.checked })}
                      disabled={isUpdateSettingsLoading}
                    />
                  }
                  label={settings.clickToReload ? 'Enabled' : 'Disabled'}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Vitals Polling Interval</Typography>
                <Typography variant='body2'>
                  The frequency at which the Minimon server polls for hardware updates. Note that you
                  shouldn't set this value lower than it takes to retrieve all the vitals. You can see the
                  various timings by enabling the debug screen below.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue={settings.pollingInterval.toString()}
                  onSubmit={(value) => updateSettings({ pollingInterval: parseInt(value) })}
                  TextFieldProps={{
                    label: 'Milliseconds',
                    size: 'small',
                    type: 'number',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Theme Mode</Typography>
                <Typography variant='body2'>
                  Color mode of the current Minimon Client theme. Note that this will change the Admin theme
                  as well as the Dashboard theme.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <ButtonGroup fullWidth>
                  <Button
                    fullWidth
                    disabled={settings.themeMode === ThemeMode.LIGHT || isUpdateSettingsLoading}
                    onClick={() => updateSettings({ themeMode: ThemeMode.LIGHT })}
                  >
                    Light
                  </Button>
                  <Button
                    fullWidth
                    disabled={settings.themeMode === ThemeMode.DARK || isUpdateSettingsLoading}
                    onClick={() => updateSettings({ themeMode: ThemeMode.DARK })}
                  >
                    Dark
                  </Button>
                </ButtonGroup>
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Show Debug Screen</Typography>
                <Typography variant='body2'>
                  Displays the debug screen on the Dashboard screen with some useful information including
                  incoming messages and timings for system statistic calculations.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <FormControlLabel
                  control={
                    <Switch
                      checked={settings.showDebugScreen}
                      onChange={(e) => updateSettings({ showDebugScreen: e.target.checked })}
                      disabled={isUpdateSettingsLoading}
                    />
                  }
                  label={settings.showDebugScreen ? 'Enabled' : 'Disabled'}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={classes.section}>
          <Typography variant='h5' className={classes.sectionTitle}>
            Layout
          </Typography>

          <div className={classes.settings}>
            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Columns</Typography>
                <Typography variant='body2'>The number of columns to display on Minimon.</Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue={settings.layout.columns.toString()}
                  // @ts-ignore
                  onSubmit={(value) => updateSettings({ layout: { columns: parseInt(value) } })}
                  TextFieldProps={{
                    label: 'Columns',
                    size: 'small',
                    type: 'number',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Rows</Typography>
                <Typography variant='body2'>The number of rows to display on Minimon.</Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue={settings.layout.rows.toString()}
                  // @ts-ignore
                  onSubmit={(value) => updateSettings({ layout: { rows: parseInt(value) } })}
                  TextFieldProps={{
                    label: 'Rows',
                    size: 'small',
                    type: 'number',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Widgets</Typography>
                <Typography variant='body2'>The widgets to show on Minimon.</Typography>
              </div>

              <div className={classes.settingControl}>
                <Button variant='contained' fullWidth>
                  Unimplemented
                </Button>
              </div>
            </div>
          </div>
        </section>

        <section className={classes.section}>
          <Typography variant='h5' className={classes.sectionTitle}>
            Theme
          </Typography>

          <div className={classes.settings}>
            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Background Color</Typography>
                <Typography variant='body2'>Sets the background color of the Minimon dashboard.</Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue='Unimplemented'
                  onSubmit={(value) => console.log(value)}
                  TextFieldProps={{
                    label: 'Color',
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Dial Color</Typography>
                <Typography variant='body2'>Sets the color of the dials on the Minimon dashboard.</Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue='Unimplemented'
                  onSubmit={(value) => console.log(value)}
                  TextFieldProps={{
                    label: 'Color',
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Dial Label Font Color</Typography>
                <Typography variant='body2'>
                  Sets the font color of the dial label. The dial label is the text that appears at the bottom
                  of the dial.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue='Unimplemented'
                  onSubmit={(value) => console.log(value)}
                  TextFieldProps={{
                    label: 'Color',
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Dial Label Font Size</Typography>
                <Typography variant='body2'>
                  Sets the font size of the dial label. The dial label is the text that appears at the bottom
                  of the dial.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue='0'
                  onSubmit={(value) => console.log(value)}
                  TextFieldProps={{
                    label: 'Size (px)',
                    size: 'small',
                    type: 'number',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Dial Value Font Color</Typography>
                <Typography variant='body2'>
                  Sets the font color of the dial value. The dial value is the text that appears in the center
                  of the dial.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue='Unimplemented'
                  onSubmit={(value) => console.log(value)}
                  TextFieldProps={{
                    label: 'Color',
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Dial Value Font Size</Typography>
                <Typography variant='body2'>
                  Sets the font size of the dial value. The dial value is the text that appears in the center
                  of the dial.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <SubmitTextField
                  initialValue='0'
                  onSubmit={(value) => console.log(value)}
                  TextFieldProps={{
                    label: 'Size (px)',
                    size: 'small',
                    type: 'number',
                    disabled: isUpdateSettingsLoading,
                  }}
                  ButtonProps={{
                    size: 'small',
                    disabled: isUpdateSettingsLoading,
                  }}
                />
              </div>
            </div>
          </div>
        </section>

        <section className={classes.section}>
          <Typography variant='h5' className={classes.sectionTitle}>
            Actions
          </Typography>

          <div className={classes.settings}>
            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Reload All Clients</Typography>
                <Typography variant='body2'>
                  Emits a reload to all clients forcing them to reload the page.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <LoadingButton
                  variant='contained'
                  color='primary'
                  fullWidth
                  onClick={() => reloadClients()}
                  loading={isReloadClientsLoading}
                >
                  Reload all clients
                </LoadingButton>
              </div>
            </div>

            <div className={classes.setting}>
              <div className={classes.settingInformation}>
                <Typography className={classes.settingTitle}>Reset Settings</Typography>
                <Typography variant='body2'>
                  Resets all the settings on this page to their factory defaults. This cannot be undone.
                </Typography>
              </div>

              <div className={classes.settingControl}>
                <LoadingButton
                  variant='contained'
                  color='error'
                  fullWidth
                  onClick={() => resetSettings()}
                  loading={isResetSettingsLoading}
                >
                  Reset settings
                </LoadingButton>
              </div>
            </div>
          </div>
        </section>
      </Paper>
    </div>
  );
};
