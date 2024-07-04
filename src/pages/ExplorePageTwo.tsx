import PageHeader from "../components/PageHeader"
import {  useEffect, useState } from "react";
import { Button } from "antd";
import { useParams } from "react-router-dom";
import ExploreQueryBuilder from "../components/QueryBuilder/ExploreQueryBuilder";
import  { isQueryPresent } from "@cubejs-client/core";
import TitleModal from "../components/TitleModal";
import { VizState } from "@cubejs-client/react";
import { getDashboardItemById } from "../Api/Api";
import ItemType from '../types/ItemType';
import ExploreTitle from "../components/ExploreTitle";

/*const cubejsApi = cubejs({
    apiUrl: 'http://localhost:4000/cubejs-api/v1',
  });*/

const ExplorePageTwo = () => {
    const {idDashboard , idItem} = useParams();
    const [item, setItem] = useState<ItemType | null>( null);
    useEffect(() => {
        const fetchData = async (id: string) => {
          const data = await getDashboardItemById(parseInt(id));
          setItem(data);
        };
        if (idItem) {
          fetchData(idItem);
        }
      }, [idItem]);
    const [vizState, setVizState] = useState(null);
    const finalVizState : VizState =
    vizState || 
    ( idItem && item !== null && item.vizstate!== undefined &&  JSON.parse(item.vizstate)) ||
    {};
    //const [addingToDashboard, setAddingToDashboard] = useState(false);
    const [titleModalVisible, setTitleModalVisible] = useState(false);
    const [title, setTitle] = useState(null);
    const finalTitle =
        title != null 
        ? title : (idItem && item && item.name)
         || "New Chart";
    return (
        <>
        { titleModalVisible && <TitleModal
                //history={history}
                itemId={idItem}
                titleModalVisible={titleModalVisible}
                setTitleModalVisible={setTitleModalVisible}
                //setAddingToDashboard={setAddingToDashboard}
                finalVizState={finalVizState}
                setTitle={setTitle}
                finalTitle={finalTitle} dashboardId={idDashboard}        />}
        <PageHeader
            title={<ExploreTitle itemTitle={finalTitle}/> }
            button={<Button
                key="button"
                type="primary"
                //loading={addingToDashboard}
                disabled={!isQueryPresent(finalVizState.query || {})}
                onClick={() => setTitleModalVisible(true)}
            >
                {idItem ? "Update" : "Add to Dashboard"}
            </Button>} noBoreder={undefined} />
            <ExploreQueryBuilder  vizState={finalVizState}
        setVizState={setVizState}/></>
    )
}

export default ExplorePageTwo;