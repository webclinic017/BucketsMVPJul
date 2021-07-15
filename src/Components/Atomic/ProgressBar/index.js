import React from 'react';
import { Line } from 'react-es6-progressbar.js';

const ProgressBar = ({color, progress, month, value, ...props}) => {
  const line_options = {
    color: color,
    easing: 'easeIn',
    strokeWidth: '1.2'
  };

  return (
    <div className="mt-5 w-full">
      <div className="w-full flex justify-between mb-1">
        <span className="text-gray-700">{month}</span>
        <span className="text-gray-700">{value}</span>
      </div>
      <Line
        progress={progress}
        options={line_options}
        container_style={{width: "100%", display: "flex", alignItems: "center"}}
      />
    </div>
  );
}

export default ProgressBar;