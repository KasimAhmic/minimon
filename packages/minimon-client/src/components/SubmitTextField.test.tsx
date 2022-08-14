import React from 'react';
import { fireEvent, render, screen } from '@testing-library/react';
import { SubmitTextField } from './SubmitTextField';

const mockHandleSubmit = jest.fn();

describe('SubmitTextField', () => {
  beforeEach(() => {
    jest.clearAllMocks();
  });

  it('renders without crashing', () => {
    render(
      <SubmitTextField initialValue='testing' onSubmit={mockHandleSubmit} data-tesid='submitTextField' />,
    );

    const submitTextField = screen.getByTestId('submitTextField');

    expect(submitTextField).toBeInTheDocument();
  });

  it('fires the onSubmit hanlder on submit', () => {
    render(
      <SubmitTextField initialValue='testing' onSubmit={mockHandleSubmit} data-tesid='submitTextField' />,
    );

    const button = screen.getByTestId('submitTextFieldButton');

    button.click();

    expect(mockHandleSubmit).toHaveBeenCalled();
  });

  it('sets the text onChange', () => {
    render(
      <SubmitTextField initialValue='testing' onSubmit={mockHandleSubmit} data-tesid='submitTextField' />,
    );

    const input: HTMLInputElement = screen.getByDisplayValue('testing');

    fireEvent.change(input, {
      target: { value: 'hello world' },
    });

    expect(input.value).toBe('hello world');
  });
});
