import React, { FC, useRef } from 'react';
import { Dial } from 'components/Dial';
import { makeStyles } from 'tss-react/mui';
import { Debug } from 'components/Debug';
import { useClickToReload } from 'hooks';

const useStyles = makeStyles()((theme) => ({
  root: {
    display: 'flex',
    justifyContent: 'space-between',
    flexWrap: 'wrap',
    width: '100%',
    padding: theme.spacing(2),
    boxSizing: 'border-box',
  },
  break: {
    flexBasis: '100%',
    height: 0,
  },
}));

export const Main: FC = () => {
  const { classes } = useStyles();
  const rootRef = useRef<HTMLDivElement>(null);

  useClickToReload(rootRef);

  return (
    <div className={classes.root} ref={rootRef}>
      <Dial label='CPU' value={(stats) => stats.cpu.currentLoad} />
      <Dial label='RAM' value={(stats) => stats.ram.usedMemory} />
      <Dial label='GPU' value={(stats) => stats.gpu.utilizationGpu} />

      <div className={classes.break} />

      <Dial label='LAN' value={(stats) => stats.network.usage} />

      <Debug />
    </div>
  );
};
