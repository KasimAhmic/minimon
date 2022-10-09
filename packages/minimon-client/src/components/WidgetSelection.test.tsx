import { render, screen } from '@testing-library/react';
import { WidgetSelection } from './WidgetSelection';

const mockSelectWidgetSelectionOpen = jest.fn().mockReturnValue(true);

jest.mock('app/hooks', () => ({
  useAppSelector: jest.fn((cb) => cb()),
  useAppDispatch: jest.fn(() => jest.fn()),
}));

jest.mock('slices', () => ({
  selectWidgetSelectionOpen: () => mockSelectWidgetSelectionOpen(),
}));

describe('WidgetSelection', () => {
  it('renders without crashing', () => {
    render(<WidgetSelection />);

    expect(screen.getByTestId('widgetSelection')).toBeInTheDocument();
    expect(screen.getByTestId('widgetSelectionTitle')).toBeVisible();
  });

  it('is not rendered when the menu is closed', () => {
    mockSelectWidgetSelectionOpen.mockReturnValue(false);

    render(<WidgetSelection />);

    expect(screen.queryByTestId('widgetSelection')).not.toBeInTheDocument();
  });
});
