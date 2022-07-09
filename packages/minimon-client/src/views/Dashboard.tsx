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

export const Dashboard: FC = () => {
  const { classes } = useStyles();
  const rootRef = useRef<HTMLDivElement>(null);

  useClickToReload(rootRef);

  return (
    <div className={classes.root} ref={rootRef}>
      <Dial label='CPU' value={(vitals) => vitals.cpu.currentLoad} />
      <Dial label='RAM' value={(vitals) => vitals.ram.usedMemory} />
      <Dial label='GPU' value={(vitals) => vitals.gpu.utilizationGpu} />

      <div className={classes.break} />

      <Dial label='LAN' value={(vitals) => vitals.network.usage} />
      <Dial label='GPU Temp' value={(vitals) => vitals.gpu.temperatureGpu} suffix='°C' />

      <Debug />
    </div>
  );
};
