import React, { useEffect, useState } from "react";
import { Modal, Input } from "antd";
//import { useNavigate } from "react-router-dom";
import DashboardAddType from "../../types/DashboardAddType";
import DashboardType from "../../types/DashboardType";
import { createDashboard, getDashboardById, updateDashboard } from "../../Api/ApiDashboards";



type props ={
    dashboardModalVisible : boolean,
    setDashboardModalVisible : any,
    dashboardId : string | undefined,
    setDashboardId : any,
    fetchDatas :any,
}

const DashboardModal : React.FC<props> = ({
  dashboardId,
  setDashboardId,
  dashboardModalVisible,
  setDashboardModalVisible,
  fetchDatas,

}) => {
  //const navigate = useNavigate();
  const [title , setTitle] = useState(null);
  const [header , setHeader] = useState(null);
  const [footer , setFooter] = useState(null);
  const dashboard : DashboardAddType = {
    title :"",
    header :"",
    footer : ""
  };
  
  const [dashboardUp, setDashboardUp] = useState<DashboardType | null>( {id: 1 , title: "", header:"" , footer: ""} );
  // eslint-disable-next-line react-hooks/exhaustive-deps
  useEffect(() => {
    const fetchData = async () => {
      const dashboard: DashboardType = {
        id: 1,
        title: "",
        header: "",
        footer: ""
      };
      setDashboardUp(dashboard);
      if (dashboardId) {
        const data = await getDashboardById(parseInt(dashboardId));
        setDashboardUp(data);
        setTitle(data.title);
        setHeader(data.header);
        setFooter(data.footer);
      }
    };
  
    fetchData();
  }, [dashboardId]);
  return (
    <Modal
      key="modal"
      title="Save Dashboard"
      open={dashboardModalVisible}
      onOk={async () => {
        
        
        if (dashboardId && dashboardUp  ) {
            
            dashboardUp.title = title;
            dashboardUp.header = header;
            dashboardUp.footer = footer;
            updateDashboard(parseInt(dashboardId), dashboardUp);
            fetchDatas();
            setDashboardId(null);
        }
        else if (dashboardId === undefined || dashboardId === null) {
            dashboard.title = title;
            dashboard.header = header;
            dashboard.footer = footer;
            createDashboard(dashboard);
            fetchDatas();
        }
        fetchDatas();
        setDashboardModalVisible(false)
      }}
      onCancel={() => setDashboardModalVisible(false)}
    >
      <Input
        placeholder="Dashboard Title"
        value={title}
        onChange={e => setTitle(e.target.value)}
      />
      <Input
        placeholder="Dashboard header"
        value={header}
        onChange={e => setHeader(e.target.value)}
      />
      <Input
        placeholder="Dashboard footer"
        value={footer}
        onChange={e => setFooter(e.target.value)}
      />
    </Modal>
  );
};


export default DashboardModal;