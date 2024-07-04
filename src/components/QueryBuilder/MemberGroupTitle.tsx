import React from 'react';
import PropTypes from 'prop-types';
import styled from 'styled-components';

const LabelStyled = styled.div`
  margin-bottom: 12px;
  color: #A1A1B5;
  text-transform: uppercase;
  letter-spacing: 0.03em;
  font-size: 11px;
  font-weight: bold;
`;

type props = {
    title: string

}

const MemberGroupTitle = (prop: props) => (
  <LabelStyled>{prop.title}</LabelStyled>
);

MemberGroupTitle.propTypes = {
  title: PropTypes.string.isRequired
};

export default MemberGroupTitle;