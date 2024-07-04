import React from "react";
import { Card, Menu,  Dropdown, Modal } from "antd";
import styled from 'styled-components';
import { Link } from "react-router-dom";
import {   MenuOutlined } from "@ant-design/icons";
import { deleteDashboardItem } from "../Api/Api";

type props = {
    children : React.ReactNode,
    title : string,
    itemId : number,
    dashboardId : number, 
    fetchData : any,
    setItems : any
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
const DashboardItemDropdown = (itemId : {itemId :number , fetchData : any , setItems : any ,  dashboardId : number} ) => {

  
  const dashboardItemDropdownMenu = (
    <Menu key={"menu"}>
      <Menu.Item key={"edit"}>
        Edit<Link to={`/exploreTwo/${itemId.dashboardId}/${itemId.itemId}`}></Link>
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
              
                await deleteDashboardItem(itemId.itemId);
                return itemId.setItems(itemId.fetchData(itemId.dashboardId));
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
      overlay={dashboardItemDropdownMenu}
      placement="bottomLeft"
      trigger={["click"]}
    >
      <MenuOutlined /> 
    </Dropdown>
  );
};

const DashboardItem : React.FC<props> = ( {title , children , itemId , fetchData , setItems , dashboardId} ) => {

    return(
    
  <StyledCard
    title={title}
    bordered={false}
    style={{
      height: "100%",
      width: "100%"
    }}
    data-item-id={itemId}
    extra={<DashboardItemDropdown itemId={itemId} fetchData={fetchData} setItems={setItems} dashboardId={dashboardId}/>}
  >
    
    {children}
    
  </StyledCard>
)};

export default DashboardItem;
