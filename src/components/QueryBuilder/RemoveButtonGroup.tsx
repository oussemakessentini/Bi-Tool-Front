import React from 'react';
import PropTypes from 'prop-types';
import { Button } from 'antd';
import removeButtonSvg from './remove-button.svg';

import styled from 'styled-components';

const StyledButton = styled.a`
  height: 16px;
  width: 16px;
  background-image: url(${removeButtonSvg});
  display: block;
  position: absolute;
  right: -5px;
  top: -5px;
  z-index: 9;
  display: none;

  &:hover {
    background-position: 16px 0;
    display: block;
  }
`;

interface RemoveButtonGroupProps {
  onRemoveClick: () => void;
  children: React.ReactNode;
  display?: boolean;
}

const RemoveButtonGroup: React.FC<RemoveButtonGroupProps> = ({ onRemoveClick, children, display, ...props }) => (
  <Button.Group style={{ marginRight: 8 }} {...props}>
    {children}
    <StyledButton data-testid="remove-button" onClick={onRemoveClick}  />
  </Button.Group>
);

RemoveButtonGroup.propTypes = {
  onRemoveClick: PropTypes.func.isRequired,
  children: PropTypes.node.isRequired,
  display: PropTypes.bool
};

export default RemoveButtonGroup;
