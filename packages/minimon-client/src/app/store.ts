import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { uiPath, uiReducer, debugPath, debugReducer } from 'slices';
import {
  minimonServiceMiddleware,
  minimonServiceReducer,
  minimonServiceReducerPath,
} from '../services/minimon.service';

export const store = configureStore({
  reducer: {
    [minimonServiceReducerPath]: minimonServiceReducer,
    [debugPath]: debugReducer,
    [uiPath]: uiReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), minimonServiceMiddleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
