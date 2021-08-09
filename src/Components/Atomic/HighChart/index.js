import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import priceData from '../../../Assets/btcdata.json'
import moment from 'moment'

export default class StockChartNew extends Component {
  render() {
    const options = {style: 'currency', currency: 'USD'};
    const numberFormat = new Intl.NumberFormat('en-US', options);
    const configPrice = {

      yAxis: [{
        offset: 20,

        labels: {
          formatter: function () {
            return numberFormat.format(this.value)
          }
          ,
          x: -15,
          style: {
            "color": "#000", "position": "absolute"

          },
          align: 'center'
        },
      },

      ],
      tooltip: {
        shared: true,
        formatter: function () {
          return numberFormat.format(this.y, 0) +  '</b><br/>' + moment(this.x).format('MMMM Do YYYY, h:mm')
        }
      },
      plotOptions: {
        series: {
          showInNavigator: true,
          gapSize: 6,

        }
      },
      rangeSelector: {
        selected: 1
      },
      title: {
        text: `If you invested $10,000 in this bucket:`
      },
      chart: {
        height: 500,
      },

      credits: {
        enabled: false
      },

      legend: {
        enabled: true
      },
      xAxis: {
        type: 'date',
      },
      rangeSelector: {
        buttons: [ {
          type: 'day',
          count: 5,
          text: '5d'
        }, {
          type: 'month',
          count: 1,
          text: '1m'
        }, {
          type: 'month',
          count: 6,
          text: '6m'
        },
        {
          type: 'year',
          count: 1,
          text: '1y'
        },
        {
          type: 'year',
          count: 2,
          text: '2y'
        },
        {
          type: 'year',
          count: 5,
          text: '5y'
        }],
        selected: 4
      },
      series: [{
        name: 'Bucket Value',
        type: 'spline',

        data: this.props.data,
        tooltip: {
          valueDecimals: 0
        },

      }
      ]
    };
    return (
      <div>
         <ReactHighcharts config = {configPrice}></ReactHighcharts>
      </div>
    )
  }
}

export {StockChartNew};
