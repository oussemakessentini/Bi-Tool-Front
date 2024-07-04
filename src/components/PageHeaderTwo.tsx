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

const SpaceBetweenButtons = styled.div`
  margin-left: 10px; /* Adjust the value as per your desired spacing */
`

type elem ={
    title : any
    button : any
    buttonTwo : any
    noBoreder : any
}

const PageHeaderTwo  = (props : elem ) => (
  <StyledRow>
    <Col span={18}>
      {props.title}
    </Col>
    <ButtonsCol >
      {props.button}
    </ButtonsCol>
    <SpaceBetweenButtons/>
    <ButtonsCol >
        
      {props.buttonTwo}
    </ButtonsCol>
  </StyledRow>
);

export default PageHeaderTwo;
  