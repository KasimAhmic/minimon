import React from 'react';
import { render } from '@testing-library/react';
import { Dial } from './Dial';

const mockUseRescaledValue = jest.fn();

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
  useRescaledValue: () => mockUseRescaledValue(),
  useSettingsSelector: (cb: Function) => jest.fn((cb) => cb({ layout: { rows: 2, columns: 3 } })),
}));

describe('Dial', () => {
  beforeAll(() => {
    window.innerWidth = 1920;
    window.innerHeight = 1080;
  });

  it('renders without crashing', () => {
    mockUseRescaledValue.mockReturnValue({ rescaledValue: 75, valueLabel: '75%' });

    render(<Dial label='test' vital='cpu' property='' />);
  });
});
