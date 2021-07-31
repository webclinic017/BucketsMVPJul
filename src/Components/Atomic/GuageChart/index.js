import React from 'react';
import GaugeChart from 'react-gauge-chart';
import theme from "../../../Theme";

export default function index({beta, ...props}) {
  return (
    <div className="flex flex-col items-center">
      <GaugeChart id="gauge-chart1"
        nrOfLevels={40}
        colors={[theme.colors.red, theme.colors.lightPurple, theme.colors.green]}
        percent={beta/4}
        hideText={true}
        arcPadding={0.02}
      />
      <p className="text-xl -mt-32 text-gray-500">{beta.toFixed(2)}</p>
      <p className="text-2xl font-bold text-gray-600">Bucket Beta</p>
    </div>
  );
}
