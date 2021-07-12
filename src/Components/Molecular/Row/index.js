//python has dictionaries and not objects
//{}-you have to write return but in round bracket, you get return automatically
//map was making it read whole file every time new row component - more efficient to put map in parent and pass prop
//async- syncronous multiple processing at the same time

import React from 'react';
import Select from "react-dropdown-select";
import MicrosoftLogo from "../../../Assets/microsoftlogo.png";
import PlusIcon from "../../../Assets/plus.png";
import MinusIcon from "../../../Assets/minus.png";
import Input from "../../Atomic/Input"


const Row = ({className, stockName, onChangeStockName, onStockPercentIncrement, onStockPercentDecrement, stockPercent, stockOptions})=>{

  // Dummy array of test values.
  const options = Array.from(new Array(10000), (_, index) => ({
    label: `Item ${index}`,
    value: index
  }));

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <img src={MicrosoftLogo} className="ml-4"/>
        <Select
          options={options}
          className="ml-4 w-3/5"
        />
      </div>
      <div className="flex items-center justify-between">
        <img onClick={onStockPercentDecrement} className="w-5 h-5 object-contain cursor-pointer" src={MinusIcon} />
        <span className="mx-4 w-12 text-center">
          {`${Math.round(stockPercent)}%`}
        </span>
        <img onClick={onStockPercentIncrement} className="w-5 h-5 object-contain cursor-pointer" src={PlusIcon} />
      </div>
    </div>
  );
}

export default Row;