import React from 'react';
import * as PropTypes from 'prop-types';
import {Menu, Dropdown } from 'antd';
import styled from 'styled-components';
import { ChartType } from '@cubejs-client/react';
import { DownOutlined, LineChartOutlined, AreaChartOutlined, BarChartOutlined, PieChartOutlined, TableOutlined, InfoCircleOutlined } from '@ant-design/icons';

const StyledDropdownTrigger = styled.span`
  color: #43436B;
  cursor: pointer;
  margin-left: 13px;

  & > span {
    margin: 0 8px;
  }
`
type name = 'line' | 'bar' | 'table' | 'area' | 'number' | 'pie';

interface ChartTypee {
    name: name;
    title: string;
    icon: JSX.Element;
    }

    const ChartTypes: ChartTypee[] = [
        { name: 'line', title: 'Line', icon: <LineChartOutlined /> },
        { name: 'area', title: 'Area', icon: <AreaChartOutlined /> },
        { name: 'bar', title: 'Bar', icon: <BarChartOutlined /> },
        { name: 'pie', title: 'Pie', icon: <PieChartOutlined /> },
        { name: 'table', title: 'Table', icon: <TableOutlined /> },
        { name: 'number', title: 'Number', icon: <InfoCircleOutlined /> }
      ];

interface SelectChartTypeProps {
    chartType: ChartType | undefined;
    updateChartType: ((arg0: ChartType) => void)
    }

const SelectChartType : React.FC<SelectChartTypeProps>= ({ chartType, updateChartType }) => {
  const menu = (
    <Menu>
      {ChartTypes.map(m => (
        <Menu.Item key={m.title} onClick={() => updateChartType(m.name)} >
          {m.icon}
          <span style={{ marginLeft: 8 }}>{m.title}</span>
          
        </Menu.Item>
      ))}
    </Menu>
  );

  const foundChartType = ChartTypes.find(t => t.name === chartType);
  return (
    <Dropdown overlay={menu}  placement="bottomLeft" trigger={['click']}>
    <StyledDropdownTrigger data-testid="select-chart-type-dropdown">
      {foundChartType?.icon} 
      <span >{foundChartType?.title}</span>
      <DownOutlined />
    </StyledDropdownTrigger>
    </Dropdown>
  );
};

SelectChartType.propTypes = {
  chartType: PropTypes.any.isRequired,
  updateChartType: PropTypes.func.isRequired
};

export default SelectChartType;
