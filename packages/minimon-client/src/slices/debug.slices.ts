import { IStatsEvent } from '@ahmic/minimon-core';
import { createSlice, Draft, PayloadAction } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface DebugState {
  lastEvent: string;
  lastMessage: string;
  log: any[];
}

const initialState: DebugState = {
  lastEvent: '',
  lastMessage: '',
  log: [],
};

export const debug = createSlice({
  name: 'debug',
  initialState,
  reducers: {
    log: (state: Draft<DebugState>, action: PayloadAction<any>) => {
      if (state.log.length >= 5) {
        state.log.pop();
      }

      state.log.unshift(action.payload);

      return state;
    },

    message: (state: Draft<DebugState>, action: PayloadAction<IStatsEvent>) => {
      state.lastMessage = action.payload.data.metadata.timestamp;
    },

    event: (state: Draft<DebugState>, action: PayloadAction<any>) => {
      state.lastEvent = action.payload;
    },
  },
});

export const selectDebugLog = (state: RootState): any[] => state.debug.log;
export const selectLastEvent = (state: RootState): string => state.debug.lastEvent;
export const selectLastMessage = (state: RootState): string => state.debug.lastMessage;

export const { log, message, event } = debug.actions;

export const { name: debugPath, reducer: debugReducer } = debug;
