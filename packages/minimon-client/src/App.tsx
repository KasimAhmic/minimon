import React, { FC } from 'react';
import { CacheProvider } from '@emotion/react';
import createCache from '@emotion/cache';
import { CssBaseline, ThemeProvider } from '@mui/material';
import { lightTheme, darkTheme } from 'theme';
import { Dashboard, Admin } from 'views';
import { useSettingsSelector } from 'hooks';
import { Routes, Route } from 'react-router-dom';

export const muiCache = createCache({
  key: 'mui',
  prepend: true,
});

export const App: FC = () => {
  const themeMode = useSettingsSelector((settings) => settings.themeMode);

  const theme = themeMode === 'light' ? lightTheme : darkTheme;

  return (
    <CacheProvider value={muiCache}>
      <ThemeProvider theme={theme}>
        <CssBaseline />
        <Routes>
          <Route path='/' element={<Dashboard />} />
          <Route path='/admin' element={<Admin />} />
        </Routes>
      </ThemeProvider>
    </CacheProvider>
  );
};
