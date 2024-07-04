import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
import ItemType from "../types/ItemType";
import { createDashboardItem, getDashboardItemById, updateDashboardItem } from '../Api/Api';
import { useNavigate } from "react-router-dom";
import ItemAddType from "../types/ItemAddType";
import LayoutType from '../types/LayoutType';


type props ={
    titleModalVisible : boolean,
    setTitleModalVisible : any,
    //setAddingToDashboard : any,
    finalVizState : any,
    setTitle : any,
    finalTitle : string,
    itemId : string | undefined,
    dashboardId : string | undefined
}

const TitleModal : React.FC<props> = ({
 // history,
  itemId,
  dashboardId,
  titleModalVisible,
  setTitleModalVisible,
  //setAddingToDashboard,
  finalVizState,
  setTitle,
  finalTitle,
}) => {
  const navigate = useNavigate();
  const defaultLayout : LayoutType = {
    x : 0,
    y : 0,
    w : 4,
    h : 8
  }
  const item : ItemAddType = {   
    name:'',
    vizstate:'',
    layout: JSON.stringify(defaultLayout),
    dashboardId: 1
  };
  
  const [itemUp, setItemUp] = useState<ItemType | null>( null);
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const itemm : ItemType = {
      id: 1,
      name:'',
      vizstate:'',
      layout: JSON.stringify({x:0, y:0, w:4, h:8}),
      dashboardId: 1
    }
    setItemUp(itemm);
    const fetchData = async (id: string) => {
      const data = await getDashboardItemById(parseInt(id));
      setItemUp(data);
    };
    if (itemId) {
      fetchData(itemId);
      console.log(itemId);
    }
  }, [itemId]);
  console.log(itemId);
  return (
    <Modal
      key="modal"
      title="Save Chart"
      open={titleModalVisible}
      onOk={async () => {
        setTitleModalVisible(false);
        //setAddingToDashboard(true);
        
        if (itemId && itemUp  ) {
          
          itemUp.vizstate = JSON.stringify(finalVizState);
          itemUp.name = finalTitle;
          updateDashboardItem(parseInt(itemId), itemUp);
        }
        else if (itemId === undefined){
          item.vizstate= JSON.stringify(finalVizState);
          item.name = finalTitle;
          item.dashboardId = parseInt(dashboardId)
          createDashboardItem(item);
        }
        navigate(`/dashboardTwo/${dashboardId}`);
      }}
      onCancel={() => setTitleModalVisible(false)}
    >
      <Input
        placeholder="Dashboard Item Name"
        value={finalTitle}
        onChange={e => setTitle(e.target.value)}
      />
    </Modal>
  );
};


export default TitleModal;