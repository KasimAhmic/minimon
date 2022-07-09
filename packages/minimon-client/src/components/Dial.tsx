import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';
import { CircularProgress, Typography } from '@mui/material';
import { SystemStatsSelector, useStatPercentage } from 'hooks';

const size = 230;

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: size,
    height: size,
    background: theme.palette.background.default,
    borderRadius: '50%',
  },
  progressContainer: {
    position: 'absolute',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    width: '100%',
    height: '100%',
    transform: 'rotateZ(-125deg)',
  },
  progress: {
    position: 'absolute',
  },
  progressBackground: {
    color: theme.palette.divider,
  },
  value: {
    transform: 'rotateZ(125deg)',
    fontSize: 24,
  },
  label: {
    position: 'absolute',
    bottom: theme.spacing(2),
    fontSize: 32,
  },
}));

export interface DialProps {
  label: string;
  value: number | SystemStatsSelector;
  min?: number | SystemStatsSelector;
  max?: number | SystemStatsSelector;
  suffix?: string;
}

export const Dial: FC<DialProps> = ({ label, value, min = 0, max = 100, suffix }) => {
  const { classes } = useStyles();

  const { normalizedValue, formattedValue } = useStatPercentage(value, min, max, true, suffix);

  return (
    <div className={classes.root}>
      <div className={classes.progressContainer}>
        <CircularProgress
          variant='determinate'
          value={70}
          size={size}
          thickness={10}
          className={classes.progress}
          classes={{
            circle: classes.progressBackground,
          }}
        />
        <CircularProgress
          variant='determinate'
          value={normalizedValue}
          size={size}
          thickness={10}
          className={classes.progress}
        />

        <Typography className={classes.value} variant='h4'>
          {formattedValue}
        </Typography>
      </div>

      <Typography className={classes.label} variant='h3'>
        {label}
      </Typography>
    </div>
  );
};
