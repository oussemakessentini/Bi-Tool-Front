import React from 'react';
import PropTypes from 'prop-types';
import MemberDropdown from './MemberDropdown';
import RemoveButtonGroup from './RemoveButtonGroup';
import MemberGroupTitle from './MemberGroupTitle';
import PlusIcon from './PlusIcon';
import { CubeMember} from '@cubejs-client/core';
import { DimensionUpdater, MeasureUpdater, SegmentUpdater } from '@cubejs-client/react';



type MemberGroupProps = {
  members: CubeMember[] ,
  availableMembers: CubeMember[],
  addMemberName: string,
  title: string,
  updateMethods : MeasureUpdater | DimensionUpdater | SegmentUpdater
}



const MemberGroup: React.FC<MemberGroupProps> = ({
  members, availableMembers, addMemberName, title , updateMethods
}) => (
  <div>
    <MemberGroupTitle title={title} />
    {members.map((m, index) => (
      <RemoveButtonGroup key={m.name} onRemoveClick={() => updateMethods.remove({index})} data-testid="remove-member-button">
        <MemberDropdown type="selected" availableMembers={availableMembers} onClick={updateWith => updateMethods.update({index}, updateWith)}>
          {m.title}
        </MemberDropdown>
      </RemoveButtonGroup>
    ))}
    <MemberDropdown
      type={members.length > 0 ? "icon" : "new"}
      onClick={m => updateMethods.add(m)} availableMembers={availableMembers}
      data-testid="add-member-button"
    >
      {addMemberName}
      <PlusIcon />
    </MemberDropdown>
  </div>
);

MemberGroup.propTypes = {
  members: PropTypes.array.isRequired,
  availableMembers: PropTypes.array.isRequired,
  addMemberName: PropTypes.string.isRequired,
 /* updateMethods: PropTypes.shape({
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  }).isRequired,*/
};

export default MemberGroup;