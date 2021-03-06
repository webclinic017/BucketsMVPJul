//python has dictionaries and not objects
//{}-you have to write return but in round bracket, you get return automatically
//map was making it read whole file every time new row component - more efficient to put map in parent and pass prop
//async- syncronous multiple processing at the same time
// ()=>alert() vs. simply alert()
//make ui -

import React, {useState} from 'react';
import BucketsLogo from "../../../Assets/buckets_logo.png";
import PlusIcon from "../../../Assets/plus.png";
import MinusIcon from "../../../Assets/minus.png";
import DropdownInput from "../DropdownInput";
import trash_grey from "../../../Assets/Icons/trash_grey.png";
import trash_red from "../../../Assets/Icons/trash_red.png";
import Input from "../../../Components/Atomic/Input";

const EditableStockRow = ({stockName, onChangeStockName, onStockPercentIncrement, onStockPercentDecrement, logoUrl, stockPercent, onStockSelect, suggestions, deleteable, deleteRow, rowIndex, setStockPercent})=>{
  const [shouldSuggest, setShouldSuggest] = useState(false);
  const [hover, setHover] = useState(false);

  const handleOnMouseOver = () => {
    if(deleteable) {
      setHover(true);
    }
  }

  const handleOnMouseOut = () => {
    setHover(false);
  }

  const handleOnClickDelete = () => {
    if(deleteable) {
      deleteRow(rowIndex);
    }
  }

  return (
    <div key={rowIndex} className="flex items-center justify-between mt-4">
      <div className="flex items-center">
        <img src={logoUrl === null ? BucketsLogo : logoUrl.length ? logoUrl : BucketsLogo} className="mr-4 h-14 w-14 object-contain ml-2"/>
        <DropdownInput
          value={stockName}
          shouldSuggest={shouldSuggest && stockName.length>1}
          setShouldSuggest={setShouldSuggest}
          suggestions={suggestions}
          onChange={onChangeStockName}
          onStockSelect={onStockSelect}
        />
      </div>
      <div className="flex items-center justify-between">
        <img onClick={onStockPercentDecrement} className="w-5 h-5 cursor-pointer object-contain" src={MinusIcon} />
        <Input className="mx-2 w-14 text-center"
                value={+stockPercent ? +stockPercent : +0}
                onChange={(e)=>setStockPercent(e.target.value)}
                placeholder=""
              />
        
        
        {/* <span className="mx-4 w-12 text-center">
          {`${Math.round(stockPercent)}%`}
        </span> */}
        <img onClick={(onStockPercentIncrement)} className="w-5 h-5 object-contain cursor-pointer" src={PlusIcon} />
        <img className="w-4 h-4 object-contain ml-6 cursor-pointer -mt-1" onClick={handleOnClickDelete} src={hover ? trash_red : trash_grey} onMouseOver={handleOnMouseOver} onMouseOut={handleOnMouseOut}/>
      </div>
    </div>
  );
}

export default EditableStockRow;
