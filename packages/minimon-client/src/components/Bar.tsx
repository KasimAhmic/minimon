import { LinearProgress, Typography } from '@mui/material';
import { SystemStatsSelector, useStatPercentage } from 'hooks/useStatPercentage';
import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';

const size = 30;

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    flexGrow: 1,
  },
  progress: {
    width: '100%',
    height: size,
    marginRight: theme.spacing(1),
  },
  label: {
    position: 'absolute',
    zIndex: 100,
    paddingLeft: theme.spacing(0.5),
    fontWeight: theme.typography.fontWeightBold,
    color: '#000',
    lineHeight: size + 'px',
    fontSize: size,
  },
  value: {
    minWidth: 60,
  },
}));

export interface BarProps {
  label: string;
  value: number | SystemStatsSelector;
  min?: number | SystemStatsSelector;
  max?: number | SystemStatsSelector;
}

export const Bar: FC<BarProps> = ({ label, value, min = 0, max = 100 }) => {
  const { classes } = useStyles();

  const { normalizedValue, formattedValue } = useStatPercentage(value, min, max);

  return (
    <div className={classes.root}>
      <Typography className={classes.label}>{label}</Typography>
      <LinearProgress variant='determinate' value={normalizedValue} className={classes.progress} />
      <Typography className={classes.value}>{formattedValue}</Typography>
    </div>
  );
};
