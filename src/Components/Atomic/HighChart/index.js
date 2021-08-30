import React, { Component } from 'react'
import ReactHighcharts from 'react-highcharts/ReactHighstock.src'
import moment from 'moment'
import theme from '../../../Theme'

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
          color: theme.colors.tuscany

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
      //   events: {
       
      //     afterSetExtremes: function(e) {
      //         // console.log(e.min)
      //         // console.logthis.props)
      //         this.props.passToParent(e.min);
      //     }
      // }
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
    // const xAxis = StockChartNew.xAxis[0]
    return (
      <div>
         <ReactHighcharts config = {configPrice}></ReactHighcharts>
         {/* {console.log(this.from)} */}
      </div>
    )
  }
}

export {StockChartNew};
