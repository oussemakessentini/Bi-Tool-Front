import React from 'react';
import { render, fireEvent, getByTestId, getAllByTestId, waitFor } from '@testing-library/react';
import MemberGroup from '../../components/QueryBuilder/MemberGroup';

describe('MemberGroup', () => {
  const members = [
    { type: 'time',
        name: "member1",
        title: 'Member1',
        shortTitle: 'mm',
        isVisible: true,
        meta: "" },
        { type: 'time',
        name: "member2",
        title: 'Member2',
        shortTitle: 'mm',
        isVisible: true,
        meta: "" },
  ];
  const availableMembers = [
    { type: 'time',
        name: "member4",
        title: 'Member3',
        shortTitle: 'mm',
        isVisible: true,
        meta: "" },
        { type: 'time',
        name: "member4",
        title: 'Member',
        shortTitle: 'mm',
        isVisible: true,
        meta: "" },
  ];

  it('should render the member group with existing members and add functionality', async () => {
    const addMemberName = 'Add Member';
    const title = 'Member Group';
    const updateMethods = {
      add: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
    };

    const { getByText, getByTestId } = render(
      <MemberGroup
        members={members}
        availableMembers={availableMembers}
        addMemberName={addMemberName}
        title={title}
        updateMethods={updateMethods}
      />
    );

    const memberGroupTitle = getByText(title);
    expect(memberGroupTitle).toBeInTheDocument();

    const member1Title = getByText(members[0].title);
    const member2Title = getByText(members[1].title);
    
    const addMemberButton = getByTestId('plus-icon');

    expect(member1Title).toBeInTheDocument();
    expect(member2Title).toBeInTheDocument();
    expect(addMemberButton).toBeInTheDocument();

    fireEvent.click(addMemberButton);
    await waitFor (()=>{
        const member3Title = getByText(availableMembers[0].title);
        const member4Title = getByText(availableMembers[1].title);
        expect(member3Title).toBeInTheDocument();
        expect(member4Title).toBeInTheDocument();
        fireEvent.click(member3Title);
        expect(updateMethods.add).toHaveBeenCalled();
    })

  });

  it('should call the update and remove methods when a member is selected and removed', () => {
    const addMemberName = 'Add Member';
    const title = 'Member Group';
    const updateMethods = {
      add: jest.fn(),
      remove: jest.fn(),
      update: jest.fn(),
    };

    const { getByText, getAllByTestId } = render(
      <MemberGroup
        members={members}
        availableMembers={availableMembers}
        addMemberName={addMemberName}
        title={title}
        updateMethods={updateMethods}
      />
    );

    const member1Title = getByText(members[0].title);
    const member2Title = getByText(members[1].title);
    const removeButtons = getAllByTestId('remove-button');
   

    expect(member1Title).toBeInTheDocument();
    expect(member2Title).toBeInTheDocument();
    expect(removeButtons).toHaveLength(2);

    fireEvent.click(removeButtons[0]);
    expect(updateMethods.remove).toHaveBeenCalledWith({ index: 0 });

    fireEvent.click(removeButtons[1]);
    expect(updateMethods.remove).toHaveBeenCalledWith({ index: 1 });
  });
});
