import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import RemoveButtonGroup from '../../components/QueryBuilder/RemoveButtonGroup';

describe('RemoveButtonGroup', () => {
  it('renders correctly with children', () => {
    const onRemoveClick = jest.fn();
    const { getByText, getByTestId } = render(
      <RemoveButtonGroup onRemoveClick={onRemoveClick}>
        <span>Child 1</span>
        <span>Child 2</span>
      </RemoveButtonGroup>
    );

    expect(getByText('Child 1')).toBeInTheDocument();
    expect(getByText('Child 2')).toBeInTheDocument();

    fireEvent.click(getByTestId('remove-button'));

    expect(onRemoveClick).toHaveBeenCalledTimes(1);
  });
});
