import { createSlice, Draft } from '@reduxjs/toolkit';
import { RootState } from 'app/store';

interface UiState {
  menuOpen: boolean;
}

const initialState: UiState = {
  menuOpen: false,
};

export const ui = createSlice({
  name: 'ui',
  initialState,
  reducers: {
    toggleNavMenu: (state: Draft<UiState>) => {
      state.menuOpen = !state.menuOpen;
    },
  },
});

export const selectMenuOpen = (state: RootState): boolean => state.ui.menuOpen;

export const { toggleNavMenu } = ui.actions;

export const { name: uiPath, reducer: uiReducer } = ui;
