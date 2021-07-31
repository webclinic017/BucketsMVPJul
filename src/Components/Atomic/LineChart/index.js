//make lines thicker, make axis grey, marker size=0, legend,font - make same as figma
//target ui has to match the package offer - so you put in minimum effort
//% is a string and thus should be in quotation marks



import React from 'react';
import theme from "../../../Theme";
import {
  LineChart,
  Line,
  ResponsiveContainer
} from "recharts";

const Chart = (props) => {
  const data = [
    {
      name: "Page A",
      uv: 4000,
      pv: 2400,
      amt: 2400
    },
    {
      name: "Page B",
      uv: 3000,
      pv: 1398,
      amt: 2210
    },
    {
      name: "Page C",
      uv: 2000,
      pv: 9800,
      amt: 2290
    },
    {
      name: "Page D",
      uv: 2780,
      pv: 3908,
      amt: 2000
    },
    {
      name: "Page E",
      uv: 1890,
      pv: 4800,
      amt: 2181
    },
    {
      name: "Page F",
      uv: 2390,
      pv: 3800,
      amt: 2500
    },
    {
      name: "Page G",
      uv: 3490,
      pv: 4300,
      amt: 2100
    }
  ];

  return (
    <div>
      <ResponsiveContainer width="95%" height={400}>
        <LineChart
          data={data}
          margin={{
            top: 5,
            right: 30,
            left: 20,
            bottom: 5
          }}
        >
          <Line
            type="natural"
            dataKey="pv"
            stroke={theme.colors.orange}
            strokeWidth={4}
            dot={false}
          />
          <Line
            type="monotone"
            dot={false}
            strokeWidth={4}
            dataKey="uv"
            stroke={theme.colors.lightPurple}
          />
        </LineChart>
      </ResponsiveContainer>
    </div>
  );
}

export default Chart;