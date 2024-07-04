import React from "react";
import { Card, Menu,  Dropdown, Modal } from "antd";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {   MenuOutlined } from "@ant-design/icons";
import { deleteDashboard } from "../../Api/ApiDashboards";

type props = {
    children : React.ReactNode,
    title : string,
    dashboardId : number, 
    fetchData : any,
    setItems : any,
    setDashboardModalVisible : any,
    setDashboardId: any
}

const StyledCard = styled(Card)`
  box-shadow: 0px 2px 4px rgba(141, 149, 166, 0.1);
  border-radius: 4px;
  

  .ant-card-head {
    border: none;
  }
  .ant-card-body {
    padding-top: 12px;
    height: 100%;
    
  }
`
const DashboardDropdown = (dashboardId : {dashboardId :number , fetchData : any , setItems : any, setDashboardModalVisible : any, setDashboardId: any} ) => {

  
  const dashboardDropdownMenu = (
    <Menu key={"menu"}>
      <Menu.Item key={"show"}>
        Show<Link to={`/dashboardTwo/${dashboardId.dashboardId}`}></Link>
      </Menu.Item>  
      <Menu.Item key={"edit"}
        onClick={()=>{
          dashboardId.setDashboardId(dashboardId.dashboardId);
          dashboardId.setDashboardModalVisible(true);
        }}
      >
        Edit
      </Menu.Item>
      <Menu.Item
      key={"delete"}
        onClick={() =>{
          
          Modal.confirm({
            title: "Are you sure you want to delete this item?",
            okText: "Yes",
            okType: "danger",
            cancelText: "No",

            onOk: async () => {
              
                await deleteDashboard(dashboardId.dashboardId);
                return dashboardId.fetchData();
              }
          })
        }
          
        }
      >
        Delete
      </Menu.Item>
    </Menu>
  );


  return (
    <Dropdown
      overlay={dashboardDropdownMenu}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <MenuOutlined /> 
    </Dropdown>
  );
};

const DashboardCard : React.FC<props> = ( {title , children , dashboardId , fetchData , setItems, setDashboardModalVisible, setDashboardId} ) => {

    return(
    
  <StyledCard
    title={title}
    bordered={false}
    style={{
      height: "350px",
      width: "350px"
    }}
    data-item-id={dashboardId}
    extra={<DashboardDropdown dashboardId={dashboardId} fetchData={fetchData} setItems={setItems} setDashboardModalVisible={setDashboardModalVisible} setDashboardId={setDashboardId}/>}
  >
    
    {children}
    
  </StyledCard>
)};

export default DashboardCard;
