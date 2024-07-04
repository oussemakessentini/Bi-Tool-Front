import React, { useState } from "react";
import RGL, {  WidthProvider } from "react-grid-layout";
import "react-grid-layout/css/styles.css";
import "react-resizable/css/styles.css";
import styled from "styled-components";
import dragBackground from "./drag-background.svg";
import ItemType from '../types/ItemType';
import { updateDashboardItem } from '../Api/Api';


const ReactGridLayout = WidthProvider(RGL);

type props = {
    children : React.ReactNode,
    items : ItemType[],
    fetchData : any,
    setItems : any
}

const Dragfield = styled(ReactGridLayout)<{ isDragging: boolean }>`
  margin: 16px 28px 50px 28px;
  ${props => props.isDragging ? `
    background: url(${dragBackground});
    background-repeat: repeat-y;
    background-position: 0px -4px;
    background-size: 100% 52px;
  `: ''};
`


const DragField = (prop : props) => {
    const [isDragging, setIsDragging] = useState(false);

    const onLayoutChange = (newLayout: any[]) => {
      newLayout.forEach(l => {
        
        const item = prop.items.find(i => i.id === parseInt(l.i));
        const toUpdate = JSON.stringify({
          x: l.x,
          y: l.y,
          w: l.w,
          h: l.h
        });

        if (item && toUpdate !== item.layout){
          (async () => {
            item.layout = toUpdate;
            try {
              await updateDashboardItem(item.id, item);
              prop.fetchData(item.dashboardId);
              //prop.setItems( prop.fetchData());
            } catch (error) {
              // Handle any errors that occurred during the update or fetching of data
              console.error('Error updating dashboard item:', error);
            }
          })();
        }
        
      });
    };


    return (
        
        <Dragfield
        className="dragfield"
        margin={[12, 12]}
        containerPadding={[0, 0]}
        cols={24}
        rowHeight={40}
        onResizeStart={() => {setIsDragging(true)}}        
        onResizeStop={() => {setIsDragging(false)}} 
        onDragStart={() => {setIsDragging(true)}} 
        onDragStop={() => {setIsDragging(false)}} 
        isDraggable={true}
        isDragging={isDragging}
        onLayoutChange={onLayoutChange}
        
        >
           {prop.children}
        </Dragfield>
        
        )
    
    };

export default DragField;
