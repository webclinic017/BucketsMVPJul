//python has dictionaries and not objects
//{}-you have to write return but in round bracket, you get return automatically
//map was making it read whole file every time new row component - more efficient to put map in parent and pass prop
//async- syncronous multiple processing at the same time

import React, {useState} from 'react';
import MicrosoftLogo from "../../../Assets/microsoftlogo.png";
import PlusIcon from "../../../Assets/plus.png";
import MinusIcon from "../../../Assets/minus.png";
import DropdownInput from "../DropdownInput";


const Row = ({className, stockName, onChangeStockName, onStockPercentIncrement, onStockPercentDecrement, stockPercent, onStockSelect, suggestions})=>{
  const [shouldSuggest, setShouldSuggest] = useState(false);

  return (
    <div className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <img src={MicrosoftLogo} className="ml-4"/>
        <DropdownInput
          value={stockName}
          shouldSuggest={shouldSuggest && stockName.length>3}
          setShouldSuggest={setShouldSuggest}
          suggestions={suggestions}
          onChange={onChangeStockName}
          onStockSelect={onStockSelect}
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