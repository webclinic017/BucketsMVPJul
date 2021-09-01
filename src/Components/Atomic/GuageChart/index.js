import React from 'react';
import GaugeChart from 'react-gauge-chart';
import theme from "../../../Theme";

export default function index({beta, ...props}) {
  return (
    <div className="flex flex-col items-center" style={{width: "55%", height: 100}}>
      <p className="text-l mt-8 font-bold text-gray-600">Beta (Risk)</p>
      <p className="text-l mt-15 text-gray-500">{beta.toFixed(2)}</p>

      <GaugeChart id="gauge-chart1"
        nrOfLevels={10}
        colors={[theme.colors.green, theme.colors.lightPurple, theme.colors.red]}
        percent={beta/3}
        hideText={true}
        arcPadding={0.02}
      />
      <p className="text-l mt-12 font-semibold text-gray-500 my-5 text-center">This portfolio is {Math.abs(((beta-1)*100).toFixed(0))}% {beta>1? "more" : "less"} volatile than the S&P500</p>


    </div>
  );
}
