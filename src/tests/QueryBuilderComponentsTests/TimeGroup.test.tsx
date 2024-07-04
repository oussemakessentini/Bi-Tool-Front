import React from 'react';
import { render, screen, fireEvent } from '@testing-library/react';
import TimeGroup from '../../components/QueryBuilder/TimeGroup';
import { TCubeDimension, TimeDimension } from '@cubejs-client/core';
import { TimeDimensionExtraFields } from '@cubejs-client/react';

describe('TimeGroup', () => {
  const members:  (Omit<TimeDimension, "dimension"> & TimeDimensionExtraFields & {
    index: number;
})[] = [];
  const availableMembers: TCubeDimension[] = [];
  const addMemberName = 'Add Time Dimension';
  const title = 'Time Dimensions';
  const updateMethods = {
    add: jest.fn(),
    remove: jest.fn(),
    update: jest.fn()
  };

  beforeEach(() => {
    render(
      <TimeGroup
        members={members}
        availableMembers={availableMembers}
        addMemberName={addMemberName}
        title={title}
        updateMethods={updateMethods}
      />
    );
  });

  it('should render the time group title', () => {
    expect(screen.getByText(title)).toBeInTheDocument();
  });

  it('should render the "Add Time Dimension" button', () => {
    expect(screen.getByText('Add Time Dimension')).toBeInTheDocument();
    fireEvent.click(screen.getByText('Add Time Dimension'));
    expect(screen.getByText('No members found')).toBeInTheDocument();
  });
});
