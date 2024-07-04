import React from "react";
import { Row, Col  } from "antd";
import styled from 'styled-components';

const StyledRow = styled(Row)`
  padding: 23px 28px 13px 28px;
  background: white;
`

const ButtonsCol = styled(Col)`
  text-align: right;
`

type elem ={
    title : any
    button : any
    noBoreder : any
}

const PageHeader  = (props : elem ) => (
  <StyledRow>
    <Col span={12}>
      {props.title}
    </Col>
    <ButtonsCol span={12}>
      {props.button}
    </ButtonsCol>
  </StyledRow>
);

export default PageHeader;
  