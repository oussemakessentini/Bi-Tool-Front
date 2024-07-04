import React from "react";
import { Row, Col, Card, Divider } from "antd";
import styled from 'styled-components';
import { CubeProvider, QueryBuilder, VizState } from "@cubejs-client/react";
import MemberGroup from "./MemberGroup";
import cubejs from '@cubejs-client/core';
import FilterGroup from "./FilterGroup";
import SelectChartType from "./SelectChartType";
import ChartRenderer from "../chartRenderer";
import TimeGroup from "./TimeGroup";

const ControlsRow = styled(Row)`
  background: #ffffff;
  margin-bottom: 12px;
  padding: 18px 28px 10px 28px;
`

const StyledDivider = styled(Divider)`
  margin: 0 12px;
  height: 4.5em;
  top: 0.5em;
  background: #F4F5F6;
`

const HorizontalDivider = styled(Divider)`
  padding: 0;
  margin: 0;
  background: #F4F5F6;
`

const ChartCard = styled(Card)`
  border-radius: 4px;
  border: none;
`

const ChartRow = styled(Row)`
  padding-left: 28px;
  padding-right: 28px;
`

const Empty = styled.div`
  text-align: center;
  margin-top: 185px;
`

  const cubejsApi = cubejs({
    apiUrl: 'http://localhost:4000/cubejs-api/v1',
  });
type exploreProps = {
  vizState : VizState,
  setVizState : any
}
const ExploreQueryBuilder : React.FC<exploreProps> = ({vizState  , setVizState}) => (
    
    <QueryBuilder
    vizState={vizState}
    setVizState={setVizState}
    cubejsApi={cubejsApi}
    wrapWithQueryRenderer={false}
    render={({
      measures,
      availableMeasures,
      updateMeasures,
      dimensions,
      availableDimensions,
      updateDimensions,
      segments,
      availableSegments,
      updateSegments,
      filters,
      updateFilters,
      timeDimensions,
      availableTimeDimensions,
      updateTimeDimensions,
      isQueryPresent,
      chartType,
      updateChartType,
      validatedQuery,
      resultSet,
      
    }) =>[
      
      <ControlsRow typeof="flex" justify="space-around" align="top" key="1">
        <Col span={24}>
          <Row typeof="flex" align="top" style={{ paddingBottom: 23}}>
            <MemberGroup
              title="Measures"
              members={measures}
              availableMembers={availableMeasures}
              addMemberName="Measure"
              updateMethods={updateMeasures}
            />
            <StyledDivider type="vertical" />
            <MemberGroup
              title="Dimensions"
              members={dimensions}
              availableMembers={availableDimensions}
              addMemberName="Dimension"
              updateMethods={updateDimensions}
            />
            <StyledDivider type="vertical"/>
            <MemberGroup
              title="Segments"
              members={segments}
              availableMembers={availableSegments}
              addMemberName="Segment"
              updateMethods={updateSegments}
            />
            <StyledDivider type="vertical"/>
            <TimeGroup
              title="Time"
              members={timeDimensions}
              availableMembers={availableTimeDimensions}
              addMemberName="Time"
              updateMethods={updateTimeDimensions}
            />
            
          </Row>
          {!!isQueryPresent && ([
            <HorizontalDivider />,
            <Row typeof="flex" justify="space-around" align="top" gutter={24} style={{ marginTop: 10 }}>
              <Col span={24}>
                <FilterGroup
                  members={filters}
                  availableMembers={[...availableDimensions, ...availableMeasures]}
                  addMemberName="Filter"
                  updateMethods={updateFilters}
                />
              </Col>
            </Row>
            
          ])}
          
        </Col>
      </ControlsRow>,
      <ChartRow typeof="flex" justify="space-around" align="top" gutter={24} key="2">
      <Col span={24}>
        {isQueryPresent ? ([
          <Row style={{ marginTop: 15, marginBottom: 25 }}>
            <SelectChartType
              chartType={chartType}
              updateChartType={updateChartType}
            />
          </Row>,
          <ChartCard style={{ minHeight: 420 }}>
            <CubeProvider cubejsApi={cubejsApi}>
              <ChartRenderer 
                 vizState={{ query: vizState.query, chartType }}
                 chartHeight="500px"
              />
            </CubeProvider>            
          </ChartCard>
        ]) : (
          <Empty>
            <h2>
              Build Your Query
            </h2>
            <p>
              Choose a measure or dimension to get started
            </p>
          </Empty>
        )}
      </Col>
    </ChartRow>
    ]}
    />
       
    )


export default ExploreQueryBuilder;
