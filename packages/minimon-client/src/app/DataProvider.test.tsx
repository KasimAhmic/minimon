import React from 'react';
import { render } from '@testing-library/react';
import { DataProvider } from './DataProvider';

const mockUseGetVitalsQuery = jest.fn();
const mockUseGetSettingsQuery = jest.fn();
const mockUseMinimonStream = jest.fn();

jest.mock('services/minimon.service', () => ({
  useGetVitalsQuery: () => mockUseGetVitalsQuery(),
  useGetSettingsQuery: () => mockUseGetSettingsQuery(),
}));

jest.mock('hooks', () => ({
  useMinimonStream: () => mockUseMinimonStream(),
}));

describe('DataProvider', () => {
  it('renders without crashing', () => {
    render(<DataProvider />);

    expect(mockUseGetVitalsQuery).toHaveBeenCalled();
    expect(mockUseGetSettingsQuery).toHaveBeenCalled();
    expect(mockUseMinimonStream).toHaveBeenCalled();
  });
});
