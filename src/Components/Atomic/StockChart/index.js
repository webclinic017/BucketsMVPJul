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
          <RangeSelector.Button count={7} type="day">1w</RangeSelector.Button>
          <RangeSelector.Button count={30} type="day">1m</RangeSelector.Button>
          <RangeSelector.Button count={256} type="day">1y</RangeSelector.Button>
          <RangeSelector.Button count={356*2} type="day">2y</RangeSelector.Button>
          <RangeSelector.Button count={356*3} type="month">3y</RangeSelector.Button>
          <RangeSelector.Button count={356*4} type="month">4y</RangeSelector.Button>
          <RangeSelector.Button type="all">All</RangeSelector.Button>
        </RangeSelector>

      </HighchartsStockChart>
    );
  }
}

export default withHighcharts(StockChart, Highcharts);
