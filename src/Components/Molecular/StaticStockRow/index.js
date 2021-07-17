import React from 'react';
import BucketsLogo from "../../../Assets/buckets_logo.png";

const StaticStockRow = ({stockName, logoUrl, initialWeight, percentWeight, rowIndex})=>{
  return (
    <div key={rowIndex} className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <img src={!logoUrl.length ? BucketsLogo : logoUrl} className="mr-4 h-14 w-14 object-contain ml-2"/>
        <span className="text-lg text-gray-600">{stockName}</span>
      </div>
      <div className="flex items-center justify-between">
        <span className="mx-4 w-12 text-center text-lg">
        {`${Math.round(percentWeight)}%`}/<span className="text-gray-400">{`${Math.round(initialWeight)}%`}</span>
        </span>
      </div>
    </div>
  );
}

export default StaticStockRow;
