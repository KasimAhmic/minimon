import React, { FC } from 'react';
import {
  Button,
  ButtonGroup,
  Divider,
  Paper,
  Switch,
  Table,
  TableBody,
  TableCell,
  TableHead,
  TableRow,
  Typography,
} from '@mui/material';
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
  },
  paper: {
    display: 'flex',
    flexDirection: 'row',
    gap: theme.spacing(1),
    width: '100%',
    height: '100%',
    padding: theme.spacing(1),
    overflowY: 'auto',
  },
  wrapper: {
    display: 'flex',
    flexDirection: 'column',
    flexWrap: 'wrap',
    gap: theme.spacing(1),
    width: '100%',
    marginBottom: theme.spacing(2),
  },
  actions: {
    width: '25%',
  },
  fitCell: {
    whiteSpace: 'nowrap',
  },
  buttonGroup: {
    width: '100%',
  },
}));

export const Admin: FC = () => {
  const { classes, cx } = useStyles();

  const settings = useSettingsSelector((settings) => settings);

  const [updateSettings, { isLoading: isUpdateSettingsLoading }] = useUpdateSettings();
  const [resetSettings, { isLoading: isResetSettingsLoading }] = useResetSettings();
  const [reloadClients, { isLoading: isReloadClientsLoading }] = useReloadClients();

  return (
    <div className={classes.root}>
      <Header />

      <Paper className={classes.paper}>
        <div className={cx(classes.wrapper, classes.actions)}>
          <Typography variant='h5'>Actions</Typography>

          <Divider />

          <LoadingButton
            variant='contained'
            color='primary'
            onClick={() => reloadClients()}
            loading={isReloadClientsLoading}
          >
            Reload all clients
          </LoadingButton>

          <LoadingButton
            variant='contained'
            color='error'
            onClick={() => resetSettings()}
            loading={isResetSettingsLoading}
          >
            Reset settings
          </LoadingButton>
        </div>

        <div className={classes.wrapper}>
          <Typography variant='h5'>Settings</Typography>

          <Divider />

          <Table size='small'>
            <TableHead>
              <TableRow>
                <TableCell>Setting</TableCell>
                <TableCell>Control</TableCell>
                <TableCell>Description</TableCell>
              </TableRow>
            </TableHead>
            <TableBody>
              <TableRow>
                <TableCell className={classes.fitCell}>Click to Reload</TableCell>
                <TableCell>
                  <Switch
                    checked={settings.clickToReload}
                    onChange={(e) => updateSettings({ clickToReload: e.target.checked })}
                    disabled={isUpdateSettingsLoading}
                  />
                </TableCell>
                <TableCell>
                  Enables clicking/tapping anywhere on the Dashboard screen to reload the page. Useful for
                  devices where you might not constantly have keyboard and mouse access to.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.fitCell}>Vitals Polling Interval</TableCell>
                <TableCell>
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
                </TableCell>
                <TableCell>
                  The frequency at which the Minimon server polls for hardware updates. Note that you
                  shouldn't set this value lower than it takes to retrieve all the vitals. You can see the
                  various timings by enabling the debug screen below.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.fitCell}>Theme Mode</TableCell>
                <TableCell>
                  <ButtonGroup className={classes.buttonGroup}>
                    <Button
                      disabled={settings.themeMode === ThemeMode.LIGHT || isUpdateSettingsLoading}
                      onClick={() => updateSettings({ themeMode: ThemeMode.LIGHT })}
                      className={classes.buttonGroup}
                    >
                      Light
                    </Button>
                    <Button
                      disabled={settings.themeMode === ThemeMode.DARK || isUpdateSettingsLoading}
                      onClick={() => updateSettings({ themeMode: ThemeMode.DARK })}
                      className={classes.buttonGroup}
                    >
                      Dark
                    </Button>
                  </ButtonGroup>
                </TableCell>
                <TableCell>
                  Color mode of the current Minimon Client theme. Note that this will change the Admin theme
                  as well as the Dashboard theme.
                </TableCell>
              </TableRow>

              <TableRow>
                <TableCell className={classes.fitCell}>Show Debug Screen</TableCell>
                <TableCell>
                  <Switch
                    checked={settings.showDebugScreen}
                    onChange={(e) => updateSettings({ showDebugScreen: e.target.checked })}
                    disabled={isUpdateSettingsLoading}
                  />
                </TableCell>
                <TableCell>
                  Displays the debug screen on the Daashboard screen with some useful information including
                  incoming messages and timings for system statistic calculations
                </TableCell>
              </TableRow>
            </TableBody>
          </Table>
        </div>
      </Paper>
    </div>
  );
};
