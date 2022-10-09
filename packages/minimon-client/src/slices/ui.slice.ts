import { createSlice, Draft } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface UiState {
  widgetSelectionOpen: boolean;
}

const initialState: UiState = {
  widgetSelectionOpen: false,
};

export const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleWidgetSelection: (state: Draft<UiState>) => {
      state.widgetSelectionOpen = !state.widgetSelectionOpen;
    },
  },
});

export const selectWidgetSelectionOpen = (state: RootState): boolean => state.ui.widgetSelectionOpen;

export const { toggleWidgetSelection } = ui.actions;

export const { name: uiPath, reducer: uiReducer } = ui;
