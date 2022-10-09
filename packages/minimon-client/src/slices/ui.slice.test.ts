import { configureStore } from '@reduxjs/toolkit';
import { RootState } from 'app/store';
import { selectWidgetSelectionOpen, toggleWidgetSelection, uiPath, uiReducer } from './ui.slice';

const buildStore = () => configureStore({ reducer: { [uiPath]: uiReducer } });

describe('UI Slice', () => {
  let store: ReturnType<typeof buildStore>;
  const getState = () => store.getState() as RootState;

  beforeEach(() => {
    store = buildStore();
  });

  it('has the correct default state', () => {
    expect(getState()[uiPath]).toEqual({ widgetSelectionOpen: false });
  });

  it('opens the widget selection menu', () => {
    store.dispatch(toggleWidgetSelection());

    expect(selectWidgetSelectionOpen(getState())).toBe(true);
  });

  it('closes the widget selection menu', () => {
    store.dispatch(toggleWidgetSelection());
    store.dispatch(toggleWidgetSelection());

    expect(selectWidgetSelectionOpen(getState())).toBe(false);
  });
});
