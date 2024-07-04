import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import SelectChartType from '../../components/QueryBuilder/SelectChartType';

describe('SelectChartType', () => {
  it('renders correctly with initial chart type', () => {
    const chartType = 'line';
    const updateChartType = jest.fn();
    const { getByText, getByTestId } = render(
      <SelectChartType chartType={chartType} updateChartType={updateChartType} />
    );

    expect(getByText('Line')).toBeInTheDocument();

    fireEvent.click(getByText('Line'));

    expect(updateChartType).not.toHaveBeenCalled();
  });

  it('updates chart type on selection', () => {
    const chartType = 'line';
    const updateChartType = jest.fn();
    const { getByText, getByTestId } = render(
      <SelectChartType chartType={chartType} updateChartType={updateChartType} />
    );

    fireEvent.click(getByTestId('select-chart-type-dropdown'));

    const barChartOption = getByText('Bar');
    fireEvent.click(barChartOption);

    expect(updateChartType).toHaveBeenCalledWith('bar');
  });
});
