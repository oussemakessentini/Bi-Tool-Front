import React from 'react';
import { render, fireEvent } from '@testing-library/react';
import MemberDropdown from '../../components/QueryBuilder/MemberDropdown';

describe('MemberDropdown', () => {
  const availableMembers = [
    { name: 'member1', title: 'Member 1' },
    { name: 'member2', title: 'Member 2' },
    { name: 'member3', title: 'Member 3' },
  ];

  it('should render the dropdown with available members', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <MemberDropdown onClick={onClick} availableMembers={availableMembers} type="new">
        Dropdown Button
      </MemberDropdown>
    );

    const dropdownButton = getByRole('button', { name: /Dropdown Button/i });
    fireEvent.click(dropdownButton);

    const member1Item = getByText('Member 1');
    const member2Item = getByText('Member 2');
    const member3Item = getByText('Member 3');

    expect(member1Item).toBeInTheDocument();
    expect(member2Item).toBeInTheDocument();
    expect(member3Item).toBeInTheDocument();

    fireEvent.click(member2Item);
    expect(onClick).toHaveBeenCalledWith(availableMembers[1]);
  });

  it('should render "No members found" when no members are available', () => {
    const onClick = jest.fn();
    const { getByRole, getByText } = render(
      <MemberDropdown onClick={onClick} availableMembers={[]} type="new">
        Dropdown Button
      </MemberDropdown>
    );

    const dropdownButton = getByRole('button', { name: /Dropdown Button/i });
    fireEvent.click(dropdownButton);

    const noMembersFoundItem = getByText('No members found');

    expect(noMembersFoundItem).toBeInTheDocument();
  });
});
