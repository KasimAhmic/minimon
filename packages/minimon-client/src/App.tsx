import React from 'react';
import { Dial } from './components/Dial';
import { makeStyles } from 'tss-react/mui';
import { Debug } from 'components/Debug';
import { useDebug } from 'hooks/useDebug';
import { Bar } from 'components/Bar';

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

function App() {
  const { classes } = useStyles();

  useDebug();

  return (
    <div className={classes.root}>
      <Dial label='CPU' value={(stats) => stats.cpu.currentLoad} />
      <Dial label='RAM' value={(stats) => stats.ram.usedMemory} />
      <Dial label='GPU' value={(stats) => stats.gpu.utilizationGpu} />

      <div className={classes.break} />

      <Bar label='LAN' value={(stats) => stats.network.usage} />

      <Debug />
    </div>
  );
}

export default App;
