import { configureStore, ThunkAction, Action } from '@reduxjs/toolkit';
import { debugPath, debugReducer } from 'slices/debug.slices';
import {
  minimonServiceMiddleware,
  minimonServiceReducer,
  minimonServiceReducerPath,
} from '../services/minimon.service';

export const store = configureStore({
  reducer: {
    [minimonServiceReducerPath]: minimonServiceReducer,
    [debugPath]: debugReducer,
  },
  middleware: (getDefaultMiddleware) => [...getDefaultMiddleware(), minimonServiceMiddleware],
});

export type AppDispatch = typeof store.dispatch;
export type RootState = ReturnType<typeof store.getState>;
export type AppThunk<ReturnType = void> = ThunkAction<ReturnType, RootState, unknown, Action<string>>;
