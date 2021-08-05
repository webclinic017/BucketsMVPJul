import React from 'react';
import { PieChart } from 'react-minimal-pie-chart';

export default function index({data, total, ...props}) {
  return (
    <div className="flex flex-col items-center" style={{width: "50%", height: 400}}>
    <p className="text-2xl mt-12 font-bold text-gray-600 my-5">Sector Breakdown</p>
      <PieChart
        animate={true}
        label={({ x, y, dx, dy, dataEntry }) => (
          <>
            <text
              x={x}
              y={y+14}
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
              {dataEntry.title.split(" ")[0]}
            </text><br />
            <text
              x={x}
              y={y+7}
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
              {dataEntry.title.split(" ")[1]}
            </text><br />
          </>
      )}
        animationDuration={1000}
        data={data}
      />
    </div>
  )
}
