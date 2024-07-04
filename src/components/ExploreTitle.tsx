import React from "react";
import { Typography } from "antd";
import { Link } from "react-router-dom";
import styled from 'styled-components';

const StyledLink = styled(Link)`
  && {
    color: #D5D5DE;
    &:hover {
      color: #7A77FF;
    }
  }
`

const StyledDash = styled.span`
  color: #D5D5DE;
`

type props = {
  itemTitle: string
}

const ExploreTitle: React.FC<props> = ( {itemTitle} ) => {
  return (
    <Typography.Title level={4}>
    { itemTitle ?
    (
      <span>
        <StyledLink to="/">Dashboard</StyledLink>
        <StyledDash> — </StyledDash>
        {itemTitle}
     </span>
    ) : "Explore" }
  </Typography.Title>
  )
};
  
  


export default ExploreTitle;
