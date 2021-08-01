import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function index({data, total, ...props}) {
  return (
    <div style={{width: "95%", height: 200}}>
      <PieChart
        animate={true}
        label={({ x, y, dx, dy, dataEntry }) => (
          <text
            x={x}
            y={y}
            dx={dx}
            dy={dy}
            dominant-baseline="central"
            text-anchor="middle"
            style={{
              fontSize: '5px',
              fontFamily: 'sans-serif',
            }}
          >
            {Math.round((dataEntry.value/total)*100) + '%'}
          </text>
      )}
        animationDuration={1000}
        data={data}
      />
    </div>
  )
}
