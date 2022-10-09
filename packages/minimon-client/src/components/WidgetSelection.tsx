import { Collapse, Typography } from '@mui/material';
import { useAppSelector } from 'app/hooks';
import { FC } from 'react';
import { selectWidgetSelectionOpen } from 'slices';
import { makeStyles } from 'tss-react/mui';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    padding: theme.spacing(2),
  },
}));

export const WidgetSelection: FC = () => {
  const { classes } = useStyles();

  const open = useAppSelector(selectWidgetSelectionOpen);

  return (
    <Collapse in={open} unmountOnExit>
      <div className={classes.root} data-testid='widgetSelection'>
        <Typography variant='h6' data-testid='widgetSelectionTitle'>
          Widget Selection (WIP)
        </Typography>
      </div>
    </Collapse>
  );
};
