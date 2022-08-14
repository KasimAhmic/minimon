import React from 'react';
import { render } from '@testing-library/react';
import { Dial } from './Dial';

const mockUseRescaledValue = jest.fn();

jest.mock('hooks', () => ({
  ...jest.requireActual('hooks'),
  useRescaledValue: () => mockUseRescaledValue(),
}));

describe('Dial', () => {
  it('renders without crashing', () => {
    mockUseRescaledValue.mockReturnValue({ rescaledValue: 75, valueLabel: '75%' });

    render(<Dial label='test' vital='cpu' property='' />);
  });
});
