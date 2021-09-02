import React, { Component } from 'react';
import ReactHighcharts from 'react-highcharts/ReactHighstock.src';
import moment from 'moment';
import theme from '../../../Theme';

export default class StockChartNew extends Component {
  constructor(props) {
    super(props);
  }

  state = {
    percentReturn: null
  };

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
        text: `If you invested $10,000 in this bucket a year ago:`
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
        events: {
          afterSetExtremes: (e) => {
            const eMax = this.props.data.filter((entry)=>entry[0]===e.max)[0];
            const eMin = this.props.data.filter((entry)=>entry[0]===e.min)[0];
            console.log({data: this.props.data});
            console.log({eMax: e.max, eMin: e.min});
            console.log({filteredEMax: eMax, filteredEMin: eMin});
            if(eMax && eMin) {
              const percentReturn = (((eMax[1]-eMin[1])/eMin[1])*100).toFixed(0);
              this.setState({percentReturn});
            }
          }
        }
      },
      rangeSelector: {
        buttons: [{
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
       
        
       ],
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
        {
          this.state.percentReturn
            &&
              <center>
                <b>Percent Return: </b>{this.state.percentReturn}%
              </center>
        }
        <ReactHighcharts config = {configPrice}/>
      </div>
    )
  }
}

export {StockChartNew};
