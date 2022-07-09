import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';
import { useVitalsSelector, useSettingsSelector } from 'hooks';
import { useAppSelector } from 'app/hooks';
import { selectDebugLog, selectLastEvent, selectLastMessage } from 'slices';

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'absolute',
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    gap: theme.spacing(1),
    flexWrap: 'wrap',
    padding: 0,
    fontFamily: 'Monospace',
    fontSize: 14,
    color: theme.palette.common.white,
    textShadow: '0 0 2px #000, 0 0 2px #000, 0 0 2px #000',
  },
  table: {
    display: 'flex',
    flexDirection: 'column',
    alignItems: 'flex-start',
    flexGrow: 1,
    margin: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    lineHeight: 0.85,
  },
  break: {
    flexBasis: '100%',
    height: 0,
  },
}));

export const Debug: FC = () => {
  const { classes } = useStyles();

  const meta = useVitalsSelector((vitals) => vitals.metadata);
  const showDebugScreen = useSettingsSelector((settings) => settings.showDebugScreen);
  const logs = useAppSelector(selectDebugLog);
  const lastEvent = useAppSelector(selectLastEvent);
  const lastMessage = useAppSelector(selectLastMessage);

  return showDebugScreen ? (
    <div className={classes.root}>
      <table className={classes.table}>
        <thead>
          <tr>
            <th colSpan={2}>Miscellaneous</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>Last message</td>
            <td>{lastMessage}</td>
          </tr>
          <tr>
            <td>Last event</td>
            <td>{lastEvent}</td>
          </tr>
        </tbody>
      </table>

      <table className={classes.table}>
        <thead>
          <tr>
            <th colSpan={2}>Messages</th>
          </tr>
        </thead>
        <tbody>
          {logs.map((entry) => (
            <tr key={entry}>
              <td>{entry}</td>
            </tr>
          ))}
        </tbody>
      </table>

      <table className={classes.table}>
        <thead>
          <tr>
            <th colSpan={2}>Timings</th>
          </tr>
        </thead>
        <tbody>
          <tr>
            <td>CPU</td>
            <td>{meta.cpuVitalsProcessingTime}</td>
          </tr>
          <tr>
            <td>RAM</td>
            <td>{meta.ramVitalsProcessingTime}</td>
          </tr>
          <tr>
            <td>GPU</td>
            <td>{meta.gpuVitalsProcessingTime}</td>
          </tr>
          <tr>
            <td>LAN</td>
            <td>{meta.networkVitalsProcessingTime}</td>
          </tr>
          <tr>
            <td>Total</td>
            <td>{meta.totalProcessingTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  ) : null;
};
