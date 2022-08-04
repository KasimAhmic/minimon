import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';
import { CircularProgress, Typography } from '@mui/material';
import { useRescaledValue } from 'hooks';
import { SystemVitalType } from '@ahmic/minimon-core';

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
  vital: SystemVitalType;
  property: string;
}

export const Dial: FC<DialProps> = ({ label, vital, property }) => {
  const { classes } = useStyles();

  const { rescaledValue, valueLabel } = useRescaledValue(
    // TODO: This type cast _should_ be safe since this type is validated in Core. When
    // user input is enabled, we _may_ need to revalidate it.
    (vitals) => vitals[vital][property as keyof typeof vitals[typeof vital]],
  );

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
          value={rescaledValue}
          size={size}
          thickness={10}
          className={classes.progress}
        />

        <Typography className={classes.value} variant='h4'>
          {valueLabel}
        </Typography>
      </div>

      <Typography className={classes.label} variant='h3'>
        {label}
      </Typography>
    </div>
  );
};
