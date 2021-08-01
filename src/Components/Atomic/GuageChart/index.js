import React from 'react';
import GaugeChart from 'react-gauge-chart';
import theme from "../../../Theme";

export default function index({beta, ...props}) {
  return (
    <div className="flex flex-col items-center" style={{width: "55%", height: 100}}>
      <p className="text-2xl font-bold text-gray-600">Bucket Beta (Risk)</p>
      <GaugeChart id="gauge-chart1"
        nrOfLevels={40}
        colors={[theme.colors.green, theme.colors.lightPurple, theme.colors.red]}
        percent={beta/4}
        hideText={true}
        arcPadding={0.02}
      />
      <p className="text-xl -mt-32 text-gray-500">{beta.toFixed(2)}</p>

    </div>
  );
}
