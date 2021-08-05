import React, { Component } from 'react';
import Highcharts from 'highcharts/highstock';
import {
  HighchartsStockChart, Chart, withHighcharts, XAxis, YAxis, SplineSeries, RangeSelector, Tooltip
} from 'react-jsx-highstock';


class StockChart extends Component {
  render() {
    return (
      <HighchartsStockChart>
        <Chart zoomType="x" />

        <Tooltip />

        <XAxis>
        </XAxis>

        <YAxis>
          {
            Object.entries(this.props.data).map(([key, value])=>(
              <SplineSeries id={key} name={key} data={value.map((entry)=>([new Date(entry.date).getTime(), entry.close]))} />
            ))
          }
        </YAxis>

        <RangeSelector selected={8}>
          <RangeSelector.Button count={1} type="day">1d</RangeSelector.Button>
          <RangeSelector.Button count={7} type="week">1w</RangeSelector.Button>
          <RangeSelector.Button count={1} type="month">1m</RangeSelector.Button>
          <RangeSelector.Button count={1} type="year">1y</RangeSelector.Button>
          <RangeSelector.Button count={2} type="year">2y</RangeSelector.Button>
          <RangeSelector.Button count={3} type="year">3y</RangeSelector.Button>
          <RangeSelector.Button count={4} type="year">4y</RangeSelector.Button>
          <RangeSelector.Button type="all">All</RangeSelector.Button>
        </RangeSelector>

      </HighchartsStockChart>
    );
  }
}

export default withHighcharts(StockChart, Highcharts);
