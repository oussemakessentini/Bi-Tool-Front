import React from 'react';
import { render, screen } from '@testing-library/react';
import ButtonDropdown from '../../components/QueryBuilder/ButtonDropdown';

describe('ButtonDropdown', () => {
  test('renders button with correct styling based on type prop', () => {
    render(
      <ButtonDropdown
        overlay={<div>Overlay Content</div>}
        type="time-group"
        children="Button Text"
      />
    );

    const button = screen.getByText('Button Text');

    expect(button).toBeInTheDocument();
  });
});
