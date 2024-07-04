import React from 'react';
import * as PropTypes from 'prop-types';
import { Select } from 'antd';
import MemberDropdown from './MemberDropdown';
import RemoveButtonGroup from './RemoveButtonGroup';
import FilterInput from './FilterInput';
import PlusIcon from './PlusIcon';
import { TCubeDimension, TCubeMeasure } from '@cubejs-client/core';
//import { CubeMjsApi, TCubeDimension } from '@cubejs-client/core';

type Member = any;

type FilterGroupProps = {
  members: Member[];
  availableMembers: (TCubeDimension | TCubeMeasure)[];
  addMemberName: string;
  updateMethods: {
    add: (member: Member) => void;
    remove: (member: Member) => void;
    update: (oldMember: Member, newMember: Member) => void;
  };
};

const FilterGroup: React.FC<FilterGroupProps> = ({
  members,
  availableMembers,
  addMemberName,
  updateMethods,
}) => (
  <span>
    {members.map((m: Member) => (
      <div style={{ marginBottom: 12 }} key={m.index}>
        <RemoveButtonGroup onRemoveClick={() => updateMethods.remove(m)}>
          <MemberDropdown
            type="selected-filter"
            onClick={(updateWith: Member) => updateMethods.update(m, { ...m, dimension: updateWith })}
            availableMembers={availableMembers}
           /* style={{
              width: 150,
              textOverflow: 'ellipsis',
              overflow: 'hidden',
            }}*/
          >
            {m.dimension.title}
          </MemberDropdown>
        </RemoveButtonGroup>
        <Select
          data-testid="operator-select" 
          value={m.operator}
          onChange={(operator: string) => updateMethods.update(m, { ...m, operator : operator })}
          style={{ width: 200, marginRight: 8 }}
        >
          {m.operators.map((operator :any ) => (
            <Select.Option
              key={operator.name}
              value={operator.name}
            >
              {operator.title}
            </Select.Option>
          ))}
        </Select>
        <FilterInput member={m} key="filterInput" updateMethods={updateMethods}/>
      </div>
    ))}
    <MemberDropdown
      onClick={(m: Member) => updateMethods.add({ dimension: m })}
      availableMembers={availableMembers}
      type="new"
    >
      {addMemberName}
      <PlusIcon />
    </MemberDropdown>
  </span>
);

FilterGroup.propTypes = {
  members: PropTypes.array.isRequired,
  availableMembers: PropTypes.array.isRequired,
  addMemberName: PropTypes.string.isRequired,
  /*updateMethods: PropTypes.shape({
    add: PropTypes.func.isRequired,
    remove: PropTypes.func.isRequired,
    update: PropTypes.func.isRequired,
  }).isRequired,*/
};

export default FilterGroup;
