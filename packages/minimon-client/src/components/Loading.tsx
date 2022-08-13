import React, { FC } from 'react';
import { useSettingsStatus } from 'hooks';
import { CircularProgress, Fade, IconButton } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import { Icon } from './Icon';

const useStyles = makeStyles()((theme) => ({
  root: {
    position: 'fixed',
    top: 0,
    left: 0,
    right: 0,
    bottom: 0,
    display: 'flex',
    alignItems: 'center',
    justifyContent: 'center',
    backgroundColor: theme.palette.background.paper,
  },
  spinnerRoot: {
    position: 'absolute',
  },
  spinnerCircle: {
    strokeLinecap: 'round',
  },
  reloadButton: {
    position: 'absolute',
  },
  reloadIcon: {
    fontSize: window.innerHeight * 0.5,
    fontWeight: theme.typography.fontWeightBold,
  },
}));

const reload = () => document.location.reload();

export const Loading: FC = () => {
  const { classes } = useStyles();

  const { isSuccess, isLoading, isFetching } = useSettingsStatus();

  return isSuccess ? null : (
    <div className={classes.root}>
      <Fade in={isFetching || isLoading}>
        <CircularProgress
          variant='indeterminate'
          size={window.innerHeight * 0.5}
          thickness={5}
          classes={{
            root: classes.spinnerRoot,
            circle: classes.spinnerCircle,
          }}
        />
      </Fade>

      <Fade in={!(isFetching && isLoading)}>
        <IconButton onClick={reload} className={classes.reloadButton}>
          <Icon
            icon='refresh'
            classes={{
              root: classes.reloadIcon,
            }}
          />
        </IconButton>
      </Fade>
    </div>
  );
};
