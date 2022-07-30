import React, { FC } from 'react';
import { AppBar, Toolbar, Typography } from '@mui/material';
import { makeStyles } from 'tss-react/mui';
import MinimonIcon from '../minimon_flat_128.png';

const useStyles = makeStyles()((theme) => ({
  toolbar: {
    display: 'flex',
    gap: theme.spacing(1),
    alignItems: 'center',
    paddingLeft: theme.spacing(2),
    paddingRight: theme.spacing(3),
  },
  logo: {
    width: 32,
    height: 32,
    marginRight: theme.spacing(1),
  },
}));

export const Header: FC = () => {
  const { classes } = useStyles();

  return (
    <AppBar>
      <Toolbar className={classes.toolbar}>
        <img src={MinimonIcon} className={classes.logo} alt='Minimon Logo' />

        <Typography variant='h6'>Minimon Admin</Typography>
      </Toolbar>
    </AppBar>
  );
};
