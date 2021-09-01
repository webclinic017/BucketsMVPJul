import React, { useState } from 'react';
import ReactTooltip from 'react-tooltip';
import { PieChart } from 'react-minimal-pie-chart';

export default function CustomPieChart({data, total, ...props}) {
  const [hovered, setHovered] = useState(null);
  
  function makeTooltipContent(entry) {
    return `${entry.tooltip} : ${entry.value/100}%`;
  }

  return (
    <div className="flex flex-col items-center" style={{width: "50%", height: 400}}>
      <p className="text-l mt-8 font-bold text-gray-600">{props.text}</p>
      <div className="mt-4" data-tip="" data-for="chart">
        <PieChart
          animate={true}
          label={({ x, y, dx, dy, dataEntry }) => (
            <>
              {/* <text
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
              </text><br /> */}
            </>
          )}
          onMouseOver={(_, index) => {
            setHovered(index);
          }}
          onMouseOut={() => {
            setHovered(null);
          }}
          animationDuration={1000}
          data={data}
        />
        <ReactTooltip
          id="chart"
          getContent={() =>
            typeof hovered === 'number' ? makeTooltipContent(data[hovered]) : null
          }
        />
      </div>
    </div>
  )
}
