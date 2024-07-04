import React from 'react';
import { render, screen } from '@testing-library/react';
import ExploreQueryBuilder from '../../components/QueryBuilder/ExploreQueryBuilder';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { ChartType } from '@cubejs-client/core';


test('renders Explore Query Builder component', () => {
    Object.defineProperty(window, 'matchMedia', {
        writable: true,
        value: (query) => ({
          matches: false,
          media: query,
          onchange: null,
          addListener: jest.fn(), // for older versions of matchMedia
          removeListener: jest.fn(), // for older versions of matchMedia
          addEventListener: jest.fn(),
          removeEventListener: jest.fn(),
          dispatchEvent: jest.fn(),
        }),
      });

  const vizState = {};
  const setVizState = jest.fn();

  render(<ExploreQueryBuilder vizState={vizState} setVizState={setVizState} />);

  expect(screen.getByText('Build Your Query')).toBeInTheDocument();
  expect(screen.getByText('Choose a measure or dimension to get started')).toBeInTheDocument();
});


test('renders with vizstate', () => {
    const chart :ChartType = 'line'

    const vizState = {chartType:chart, query: {measures :["user"]}}; 
    const setVizState = jest.fn();
  
    render(<ExploreQueryBuilder vizState={vizState} setVizState={setVizState} />);
    const buildQueryText = screen.queryByText('Build Your Query');
    expect(buildQueryText).toBeNull();
    const buildQueryText2 = screen.queryByText('Choose a measure or dimension to get started');
    expect(buildQueryText2).toBeNull();
  });