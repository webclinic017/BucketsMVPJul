import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function index({data, total, ...props}) {
  return (
    <div style={{width: "50%", height: 200}}>
      <PieChart
        animate={true}
        label={({ x, y, dx, dy, dataEntry }) => (
          <>
            <text
              x={x}
              y={y+5}
              dx={dx}
              dy={dy}
              fill="white"
              dominant-baseline="central"
              text-anchor="middle"
              style={{
                fontSize: '5px',
                fontFamily: 'sans-serif',
              }}
            >
              {Math.round((dataEntry.value/total)*100) + '%'}
            </text><br />
            <text
              x={x}
              y={y}
              dx={dx}
              dy={dy}
              fill="white"
              dominant-baseline="central"
              text-anchor="middle"
              style={{
                fontSize: '5px',
                fontFamily: 'sans-serif',
              }}
            >
              {dataEntry.title}
            </text>
          </>
      )}
        animationDuration={1000}
        data={data}
      />
    </div>
  )
}
