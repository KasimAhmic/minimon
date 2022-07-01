import React from 'react';
import { useStatsSelector } from './hooks/useStatsSelector';

function App() {
  const data = useStatsSelector((data) => data.gpu.memoryUsed);

  return (
    <div className='App'>
      <pre>{data}</pre>
    </div>
  );
}

export default App;
