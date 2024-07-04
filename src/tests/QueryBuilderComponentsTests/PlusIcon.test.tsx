import React from 'react';
import { render, screen } from '@testing-library/react';
import PlusIcon from '../../components/QueryBuilder/PlusIcon';

describe('PlusIcon', () => {
  it('renders the plus icon correctly', () => {
    render(<PlusIcon />);
    const plusIcon = screen.getByTestId('plus-icon');
    expect(plusIcon).toBeInTheDocument();
  });
});
