import React from 'react';
import {
  ResponsiveContainer,
  FunnelChart,
  LabelList,
  Tooltip,
  Funnel
} from "recharts";

const PyramidChart = ({data, ...props}) => {
  return (
    <ResponsiveContainer width="95%" height={400}>
      <FunnelChart>
        <Tooltip />
        <Funnel
          dataKey="value"
          data={data}
          isAnimationActive
        >
          <LabelList position="right" fill="#000" stroke="none" dataKey="name" />
        </Funnel>
      </FunnelChart>
    </ResponsiveContainer>
  );
}

export default PyramidChart;
