import React, { FC } from 'react';
import { makeStyles } from 'tss-react/mui';
import { CircularProgress, Typography } from '@mui/material';
import { useRescaledValue, useSettingsSelector } from 'hooks';
import { MinimonTheme, SystemVitalType } from '@ahmic/minimon-core';

interface StyleProps {
  themeOverrides: MinimonTheme;
  size: number;
}

const useStyles = makeStyles<StyleProps>()((theme, { themeOverrides, size }) => ({
  root: {
    position: 'relative',
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    flexDirection: 'column',
    width: '100%',
    height: '100%',
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
  valueBackground: {
    color: themeOverrides?.dialColor ? themeOverrides.dialColor : theme.palette.primary.main,
  },
  value: {
    transform: 'rotateZ(125deg)',
    fontSize: themeOverrides?.dialValueFontSize ? parseInt(themeOverrides.dialValueFontSize) : 24,
    color: themeOverrides?.dialValueFontColor
      ? themeOverrides.dialValueFontColor
      : theme.palette.text.primary,
  },
  label: {
    position: 'absolute',
    bottom: theme.spacing(0.25),
    fontSize: themeOverrides?.dialLabelFontSize ? parseInt(themeOverrides.dialLabelFontSize) : 32,
    color: themeOverrides?.dialLabelFontColor
      ? themeOverrides.dialLabelFontColor
      : theme.palette.text.primary,
  },
}));

export interface DialProps {
  label: string;
  vital: SystemVitalType;
  property: string;
}

export const Dial: FC<DialProps> = ({ label, vital, property }) => {
  const { rescaledValue, valueLabel } = useRescaledValue(
    // TODO: This type cast _should_ be safe since this type is validated in Core. When
    // user input is enabled, we _may_ need to revalidate it.
    (vitals) => vitals[vital][property as keyof typeof vitals[typeof vital]],
  );

  const rows = useSettingsSelector((settings) => settings.layout.rows);
  const columns = useSettingsSelector((settings) => settings.layout.columns);
  const themeOverrides = useSettingsSelector((settings) => settings.theme);

  const size = Math.min(window.innerHeight / rows, window.innerWidth / columns);

  const { classes } = useStyles({ themeOverrides: themeOverrides ?? {}, size });

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
          size={size}
          value={rescaledValue}
          thickness={10}
          className={classes.progress}
          classes={{
            circle: classes.valueBackground,
          }}
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
