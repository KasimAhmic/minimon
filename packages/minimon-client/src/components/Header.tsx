import React, { FC } from 'react';
import { AppBar, Button, Toolbar, Typography, useMediaQuery, useTheme } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import MinimonIcon from '../assets/minimon_flat_128.png';
import GitHubIcon from '../assets/github.png';

const useStyles = makeStyles()((theme) => ({
  toolbar: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
  },
  minimonLogo: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(1),
  },
  spacer: {
    flexGrow: 1,
  },
  startIcon: {
    width: 16,
    height: 16,
  },
  iconButton: {
    width: 24,
    height: 24,
  },
}));

export const Header: FC = () => {
  const { classes } = useStyles();

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <img src={MinimonIcon} className={classes.minimonLogo} alt='Minimon Logo' />

        <Typography variant='h6'>Minimon Admin</Typography>

        <div className={classes.spacer} />

        <Button
          variant='outlined'
          color='inherit'
          startIcon={
            isMobile ? undefined : <img src={MinimonIcon} className={classes.startIcon} alt='GitHub Logo' />
          }
          href='/'
        >
          {isMobile ? (
            <img src={MinimonIcon} className={classes.iconButton} alt='Minimon Logo' />
          ) : (
            'Dashboard'
          )}
        </Button>

        <Button
          variant='outlined'
          color='inherit'
          startIcon={
            isMobile ? undefined : <img src={GitHubIcon} className={classes.startIcon} alt='GitHub Logo' />
          }
          href='https://github.com/KasimAhmic/minimon'
          target='_blank'
        >
          {isMobile ? <img src={GitHubIcon} className={classes.iconButton} alt='GitHub Logo' /> : 'GitHub'}
        </Button>
      </Toolbar>
    </AppBar>
  );
};
