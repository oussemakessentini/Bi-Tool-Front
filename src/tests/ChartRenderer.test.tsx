import React from 'react';
import { render , screen, waitFor } from '@testing-library/react';
import ChartRenderer from '../components/chartRenderer';
import cubejs, { ChartType } from '@cubejs-client/core';
import { CubeProvider } from '@cubejs-client/react';

// Mock the echarts library
jest.mock('echarts', () => ({
  init: jest.fn(),
  dispose: jest.fn(),
}));
const chartType : ChartType = "line"
const cubejsApi = cubejs({
    apiUrl: 'http://localhost:4000/cubejs-api/v1',
  });
describe('ChartRenderer component', () => {
  test('renders chart component based on vizState', async () => {
    // Mock the props
    const vizState = {
      query: { measures: ["Users.count"] },
      chartType: chartType,
    };
    const chartHeight = '400px';

    const { container } = render(
        <CubeProvider cubejsApi={cubejsApi}><ChartRenderer vizState={vizState} chartHeight={chartHeight} /></CubeProvider>
      
    );

    await waitFor(()=>{
        expect(container).toMatchSnapshot();
    })

  });
});
