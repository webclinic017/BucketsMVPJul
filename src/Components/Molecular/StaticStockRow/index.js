import React from 'react';
import { useHistory } from 'react-router-dom';
import BucketsLogo from "../../../Assets/buckets_logo.png";

const StaticStockRow = ({stock, rowIndex})=>{
  const history = useHistory();

  const handleOnClickStockRowPress = () => {
    history.push({
      pathname: `/stock/${stock.id}`, 
      state: {stock}
    });
  }

  return (
    <div onClick={handleOnClickStockRowPress} key={rowIndex} className="flex items-center justify-between mt-4 cursor-pointer">
      <div className="flex items-center">
        <img src={!stock.logoUrl.length ? BucketsLogo : stock.logoUrl} className="mr-4 h-14 w-14 object-contain ml-2"/>
        <div>
          <span className="text-lg text-gray-600">{stock.name}</span><br/>
          <span className="text-md text-gray-500">{stock.ticker}</span>
        </div>
      </div>
      <div className="flex items-center justify-between">
        <span className="mx-4 w-24 text-center text-lg">
          {`${Math.round(stock.percentWeight)}%`} / <span className="text-gray-400">{`${Math.round(stock.targetWeight)}%`}</span>
        </span>
      </div>
    </div>
  );
}

export default StaticStockRow;
