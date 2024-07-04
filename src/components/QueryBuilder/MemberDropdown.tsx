import * as PropTypes from "prop-types";
import { Menu } from "antd";
import { sortBy, prop } from 'ramda';
import ButtonDropdown from "./ButtonDropdown";
import React, { FC } from "react";

const sortByTitle = sortBy(prop("title"));

interface MemberDropdownProps {
  onClick: (m: any) => void;
  availableMembers: Array<any>;
  type : 'new' | 'icon' | 'selected' | 'time-group' | 'selected-filter';
  children : React.ReactNode;
  
}

const memberMenu = (onClick: (m: any) => void, availableMembers: Array<any>) => (
  <Menu>
    {availableMembers.length ? (
      sortByTitle(availableMembers).map(m => (
        <Menu.Item key={m.name} onClick={() => onClick(m)}>
          {m.title}
        </Menu.Item>
      ))
    ) : (
      <Menu.Item disabled>No members found</Menu.Item>
    )}
  </Menu>
);

const MemberDropdown: FC<MemberDropdownProps> = ({ onClick, availableMembers,type, ...buttonProps }) => (
  <ButtonDropdown 
        
        type={type} overlay={memberMenu(onClick, availableMembers)}
        {...buttonProps}  />
);

MemberDropdown.propTypes = {
  onClick: PropTypes.func.isRequired,
  availableMembers: PropTypes.array.isRequired
};

export default MemberDropdown;
