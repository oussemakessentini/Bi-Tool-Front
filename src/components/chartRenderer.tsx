import React, { useEffect, useRef } from 'react';
import *  as echarts from 'echarts';
import { ChartType, ResultSet} from '@cubejs-client/core';
import { UseCubeQueryResult, VizState, useCubeQuery } from '@cubejs-client/react';
import styled from 'styled-components';
import { Col, Row, Spin, Statistic, Table } from 'antd';

const ChartOptions = (charttype : ChartType | undefined , resultSet : ResultSet ) => {
  
  
  switch (charttype) {
    case 'line' : 
      return {
        tooltip: {
          trigger: 'axis'
        },
        legend: {
          data: resultSet.series().map(series => series.title)
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
        
          type: 'category',
          boundaryGap: false,
          data: resultSet.chartPivot().map(chart => chart.xValues)
        },
        yAxis: {
          type: 'value'
        },
        series: resultSet.series().map(series => ({
          data : series.series.map(series => series.value),
          name : series.title,
          type : charttype,
          stack : 'Total'
        }))
      };
    case 'area' : 
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'cross',
            label: {
              backgroundColor: '#6a7985'
            }
          }
        },
        legend: {
          data: resultSet.series().map(series => series.title)
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          boundaryGap: false,
          data: resultSet.chartPivot().map(chart => chart.xValues)
        },
        yAxis: {
          type: 'value'
        },
        series: resultSet.series().map(series => ({
          data : series.series.map(series => series.value),
          name : series.title,
          type : 'line',
          stack : 'Total',
          areaStyle : {},
          emphasis :{
            focus: 'series'
          }
        }))

      };
    case 'bar' : 
      return {
        tooltip: {
          trigger: 'axis',
          axisPointer: {
            type: 'shadow',
            label: {
              show: true
            }
          }
        },
        legend: {
          data: resultSet.series().map(series => series.title)
        },
        grid: {
          left: '3%',
          right: '4%',
          bottom: '3%',
          containLabel: true
        },
        xAxis: {
          type: 'category',
          axisTick: {
            alignWithLabel: true
          },
          data: resultSet.chartPivot().map(chart => chart.x)
        },
        yAxis: {
          type: 'value'
        },
        series: resultSet.series().map(series => ({
          data : series.series.map(series => series.value),
          name : series.title,
          barWidth: '60%',
          type : charttype
        }))

      };
    case 'pie' : 
      return {
        tooltip: {
          trigger: 'item'
        },
        legend: {
          orient: 'vertical',
          left: 'left'
        },
        series: resultSet.series().map(series => ({
          data : series.series.map(serie =>({value :serie.value , name : serie.x}) ),
          name : series.title,
          type : charttype,
          radius: '50%',
          emphasis: {
            itemStyle: {
              shadowBlur: 10,
              shadowOffsetX: 0,
              shadowColor: 'rgba(0, 0, 0, 0.5)'
            }
          }
        }))

      };
    default: 
      return null;  

  }
}  


const SpinContainer = styled.div`
  text-align: center;
  padding: 30px 50px;
  margin-top: 30px;
`
const Spinner = () => (
  <SpinContainer>
    <Spin size="large"/>
  </SpinContainer>
)

interface ChartRendProps {
    chartType : ChartType
    resultSet :ResultSet
    chartHeight : string
}

const ChartRend: React.FC<ChartRendProps> = ({chartType  , resultSet , chartHeight }) => {
    const option = ChartOptions(chartType , resultSet )
    const chartRef = useRef<HTMLDivElement>(null);
    useEffect(() => {
                
                
        if (!chartRef.current) {
        return;
        }
        //console.log(renderProps.resultSet)
        const myChart = echarts.init(chartRef.current, null, {
          renderer: 'svg'
        });
        myChart.setOption({
        ...option
        });
        return () => {
        myChart.dispose();
        };
    }, [option ]);
    return  <div ref={chartRef} style={{ height: chartHeight, width: '100%' , paddingBottom: '60px'  }} />
}


const component = (chartType : ChartType | undefined , result : UseCubeQueryResult<any> , chartHeight : string ) =>{
    
    
    if(result.resultSet){
        if(chartType==='bar' || chartType==='line' || chartType==='area' || chartType==='pie') {
           return <ChartRend chartType={chartType} resultSet={result.resultSet} chartHeight= {chartHeight} />
        }
        else if (chartType === 'table') {
            return <Table
            pagination={false}
            columns={result.resultSet.tableColumns().map(c => ({ ...c, dataIndex: c.key }))}
            dataSource={result.resultSet.tablePivot()}
          />
        }
        else if (chartType === 'number') {
            return <Row
            typeof="flex"
            justify="center"
            align="middle"
            style={{
              height: "100%"
            }}
          >
            <Col>
              { result.resultSet.seriesNames().map(s => (
                <Statistic value={result.resultSet?.totalRow()[s.key]} />
              ))}
            </Col>
          </Row>
        }
    }
    else if (result.error){
        return result.error.toString();
    }
    else return <Spinner/>
}


interface Props {
    vizState : VizState  
    chartHeight : string 
}


const ChartRenderer: React.FC<Props> = ( { vizState , chartHeight } ):JSX.Element |null => {
  const {query , chartType} = vizState

  const renderProps = useCubeQuery(query || {});
  console.log(renderProps.resultSet);
  const chartComponent = component(chartType , renderProps ,chartHeight);
  if (typeof chartComponent === 'string') {
    // Wrap the string in a React element, such as a <div>
    return <div>{chartComponent}</div>;
  }
  return chartComponent ?? null;
};



export default ChartRenderer; 