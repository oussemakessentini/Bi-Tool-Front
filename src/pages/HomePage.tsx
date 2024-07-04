import PageHeader from "../components/PageHeader"
import { useCallback, useEffect, useState } from "react";
import { Button, Col, Empty, Row, Typography} from "antd";
import { Link } from "react-router-dom";
import { PlusOutlined } from "@ant-design/icons";
import DashboardType from "../types/DashboardType";
import imageDashboard from "../images/dashboard.png";
import Dashboard from "../components/Dashboards/DashboardCard";
import { getDashboards } from '../Api/ApiDashboards';
import DashboardModal from "../components/Dashboards/DashboardModal";


const Emptyy = ({setDashboardModalVisible , dashboardModalVisible, fetchDatas}) => (
    <div
      style={{
        //paddingTop: "200px",
        marginTop: "200px",
        textAlign: "center",
        padding: 12
      }}
    >

    { dashboardModalVisible && <DashboardModal
            dashboardModalVisible={dashboardModalVisible} 
            setDashboardModalVisible={setDashboardModalVisible} 
            dashboardId={null}
            setDashboardId={null} 
            fetchDatas={fetchDatas}       
            />}

      <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
                <h2>There are no dashboards yet</h2>
            }
        >
        
            <Button type="primary" size="large" 
            onClick={() => setDashboardModalVisible(true)}
            >
            <PlusOutlined /> 
            Add dashboard
            </Button>
        
    </Empty>  
      
      
    </div>
  );


const HomePage = () => {

  const [items, setItems] = useState<DashboardType[]>([]);
  const fetchData = useCallback(async () => {
    // Fetch data here
    const data = await getDashboards();
    setItems(data);
  },[]);
  useEffect(() => {
    
    fetchData();
  }, [fetchData]);


  const [dashboardModalVisible, setDashboardModalVisible] = useState(false);
  const [dashboardId, setDasboardId] = useState(null);

     const dashboard= (dashboard: DashboardType ) =>
      <div key={dashboard.id}>
        <Col span={8}>
        <Dashboard key={dashboard.id} dashboardId={dashboard.id} title={dashboard.title} fetchData={fetchData} setItems={setItems} setDashboardModalVisible={setDashboardModalVisible} setDashboardId={setDasboardId}>
            <Link className="navbar-brand" to="/">
            <img
                src={imageDashboard}
                alt="dashboard"
                width="100%"
                height="250px"
                className="d-inline-block align-top"
            />
            </Link>
        </Dashboard>

        </Col>
        
      </div>;
        
    
    return  items?.length ?(
      <div>
        { dashboardModalVisible && <DashboardModal
         dashboardModalVisible={dashboardModalVisible} 
         setDashboardModalVisible={setDashboardModalVisible} 
         dashboardId={dashboardId}
         setDashboardId={setDasboardId}
         fetchDatas={fetchData}        
        />}
        <PageHeader
            title={<Typography.Title level={4}>Dashboards</Typography.Title>}
            button={
                <Button type="primary"
                onClick={() => setDashboardModalVisible(true)}
                >
                    Add dashboard
                </Button>
                
            } noBoreder={undefined}></PageHeader>
            
    
        
        <div>
        <Row gutter={16}>
            
                {items.map(dashboard)}
            
        </Row>
        
        </div>
        
        
        
    </div>
            
    ): <Emptyy setDashboardModalVisible={setDashboardModalVisible} dashboardModalVisible={dashboardModalVisible} fetchDatas={fetchData}/>;
}

export default HomePage;

