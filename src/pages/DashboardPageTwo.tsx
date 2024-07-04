
import { useCallback, useEffect, useState } from "react";
import { Button, Empty, Typography} from "antd";
import { Link, useParams } from "react-router-dom";
import DashboardItem from '../components/DashboardItem';
import { DownloadOutlined, PlusOutlined } from "@ant-design/icons";
import DragField from '../components/DragField';
import { getItemsOfDashboard } from '../Api/Api';
import ChartRenderer from "../components/chartRenderer";
import ItemType from "../types/ItemType";
import { CubeProvider } from "@cubejs-client/react";
import cubejs from "@cubejs-client/core";
import PageHeaderTwo from "../components/PageHeaderTwo";
import { generatePDF } from "../Api/ApiDashboards";


const defaultLayout = (i: ItemType) => ({
  x: JSON.parse(i.layout).x || 0,
  y: JSON.parse(i.layout).y || 0,
  w: JSON.parse(i.layout).w || 4,
  h: JSON.parse(i.layout).h || 8,
  minW: 4,
  minH: 8
});


const cubejsApi = cubejs({
  apiUrl: 'http://localhost:4000/cubejs-api/v1',
});


const Emptyy = ({id}) => (
    <div
      style={{
        marginTop: "200px",
        textAlign: "center",
        padding: 12
      }}
    >
      <Empty
            image="https://gw.alipayobjects.com/zos/antfincdn/ZHrcdLPrvN/empty.svg"
            imageStyle={{ height: 60 }}
            description={
                <h2>There are no charts on this dashboard</h2>
            }
        ></Empty>

      <Link to={`/exploreTwo/${id}`}>
        <Button type="primary" size="large" >
        <PlusOutlined /> 
          Add chart
        </Button>
      </Link>
    </div>
  );


const DashboardPageTwo = () => {
  const {id} = useParams();  
  const [items, setItems] = useState<ItemType[]>([]);
  const fetchData = useCallback(async (id : string) => {
    // Fetch data here
    const data = await getItemsOfDashboard(parseInt(id));
    setItems(data);
  },[]);
  useEffect(() => {
    fetchData(id);
  }, [fetchData, id]);

  const downloadPDF = async () => {
    try {
      const pdfPath = await generatePDF(parseInt(id));
      window.open(pdfPath, '_blank');
    } catch (error) {
      console.error('Error generating PDF:', error);
    }
  };


     const dashboardItemm = (item: ItemType ) =>
      <div key={item.id} data-grid={defaultLayout(item)}>
        <DashboardItem key={item.id} itemId={item.id} title={item.name} fetchData={fetchData} setItems={setItems} dashboardId={parseInt(id)}>
        <CubeProvider cubejsApi={cubejsApi}>
          <ChartRenderer vizState={JSON.parse(item.vizstate)} chartHeight="100%" />
        </CubeProvider>  
        </DashboardItem>
      </div>;
        
    
    return  items?.length ?(
      <div>
        <PageHeaderTwo
            title={<Typography.Title level={4}>Dashboard</Typography.Title>}
            button={<Link to={`/exploreTwo/${id}`}>
                <Button type="primary">
                    Add chart
                </Button>
            </Link>} 
            buttonTwo={
              <Button type="primary" 
              style={{ background: "red", borderColor: "yellow" }}
              icon={<DownloadOutlined />}
              onClick={()=> downloadPDF()}>
                  Generate PDF
              </Button>
            }
            noBoreder={undefined}></PageHeaderTwo>
            
    
        
        
        
        <DragField items={items} fetchData={fetchData} setItems={setItems} >{items.map(dashboardItemm)}</DragField>
        
    </div>
            
    ): <Emptyy id={id}/>;
}

export default DashboardPageTwo;

