import React, { FC } from 'react';
import { useStatsSelector } from 'hooks/useStatsSelector';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'absolute',
    bottom: 0,
    right: 0,
    background: 'rgba(0, 0, 0, 0.5)',
    color: theme.palette.common.white,
    textShadow: '0 0 2px #000, 0 0 2px #000, 0 0 2px #000',
    padding: theme.spacing(1),
    paddingRight: 0,
  },
  table: {
    fontFamily: 'Monospace',
    fontSize: 14,
    '& tr td:first-of-type': {
      paddingRight: theme.spacing(1),
    },
    '& tr td:last-child': {
      textAlign: 'right',
    },
  },
}));

export const Debug: FC = () => {
  const { classes } = useStyles();

  const meta = useStatsSelector((stats) => stats.metadata);

  return (
    <div className={classes.root}>
      <table className={classes.table}>
        <tbody>
          <tr>
            <td>CPU Processing Time</td>
            <td>{meta.cpuStatsProcessingTime}</td>
          </tr>
          <tr>
            <td>RAM Processing Time</td>
            <td>{meta.ramStatsProcessingTime}</td>
          </tr>
          <tr>
            <td>GPU Processing Time</td>
            <td>{meta.gpuStatsProcessingTime}</td>
          </tr>
          <tr>
            <td>LAN Processing Time</td>
            <td>{meta.networkStatsProcessingTime}</td>
          </tr>
          <tr>
            <td>Processing Time</td>
            <td>{meta.totalProcessingTime}</td>
          </tr>
        </tbody>
      </table>
    </div>
  );
};
