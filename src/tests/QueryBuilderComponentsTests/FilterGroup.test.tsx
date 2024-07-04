import React from 'react';
import { render, screen, fireEvent, waitFor } from '@testing-library/react';
import FilterGroup from '../../components/QueryBuilder/FilterGroup';
import { TCubeDimension, TCubeMeasure, TCubeMemberType } from '@cubejs-client/core';

describe('FilterGroup', () => {
  test('renders members with correct data', () => {
    const members = [
      {
        index: 1,
        dimension: {
          title: 'Dimension 1',
        },
        operator: 'equals',
        operators: [
          { name: 'equals', title: 'Equals' },
          { name: 'notEquals', title: 'Not Equals' },
        ],
      },
      // Add more members for testing
    ];

    const typep: TCubeMemberType = "number";
    const availableMembers: (TCubeDimension | TCubeMeasure)[] = [
      {
        type: typep,
        name: 'dimension1',
        title: 'Dimension 1',
        shortTitle: 'Dim 1',
        isVisible: true,
        aggType: 'count',
        cumulative: true,
        cumulativeTotal: true,
        drillMembers: ["hhhh"],
        drillMembersGrouped: {
          measures: ["dd"],
          dimensions: ["ddd"]
        }
      },
      {
        type: typep,
        name: 'dimension 2',
        title: 'Dimension 2',
        shortTitle: 'Dim 2',
        isVisible: true,
        aggType: 'count',
        cumulative: true,
        cumulativeTotal: true,
        drillMembers: ["hhhh"],
        drillMembersGrouped: {
          measures: ["dd"],
          dimensions: ["ddd"]
        }
      },
      // Add more dimensions or measures as needed
    ];
    const addMemberName = 'Add Member';

    const updateMethods = {
      add: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
    };

    render(
      <FilterGroup
        members={members}
        availableMembers={availableMembers}
        addMemberName={addMemberName}
        updateMethods={updateMethods}
      />
    );

    // Verify that each member is rendered with the correct data
    members.forEach(async (member) => {
      // Verify the dimension title is rendered
      expect(screen.getByText(member.dimension.title)).toBeInTheDocument();

      // Verify the operator select value is correct
      const operatorSelect = screen.getByTestId('operator-select');
      //expect(operatorSelect).toHaveDisplayValue(member.operator);
      fireEvent.click(operatorSelect);
      // Verify the available operators are rendered as options
      await waitFor(()=>{
        member.operators.forEach((operator) => {
        
            expect(screen.getByText(operator.title)).toBeInTheDocument();
          });
      })
      

      const removeButton = screen.getByRole('button', { name: 'Remove' });
      expect(removeButton).toBeInTheDocument();


      const filterInput = screen.getByLabelText('Filter');
      expect(filterInput).toBeInTheDocument();
    });


    const addMemberDropdown = screen.getByRole('button', { name: 'Add Member' });
    expect(addMemberDropdown).toBeInTheDocument();
  });

});
