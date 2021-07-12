//python has dictionaries and not objects
//{}-you have to write return but in round bracket, you get return automatically
//map was making it read whole file every time new row component - more efficient to put map in parent and pass prop
//async- syncronous multiple processing at the same time

import React, {Component} from 'react';
import Select, { createFilter } from "react-select";
import MicrosoftLogo from "../../../Assets/microsoftlogo.png";
import Input from "../../Atomic/Input"


const Row = ({className, onChangeStockName, onChangeStockValue, stockName, stockPercent, stockValue, stockOptions})=>{

  // const filterOptions = (inputValue: string) => {
  //   return stockOptions.filter(i =>
  //     i.label.toLowerCase().includes(inputValue.toLowerCase())
  //   );
  // };
  //
  //   const promiseOptions = inputValue => (
  //     new Promise(resolve => {
  //       resolve(filterOptions(inputValue));
  //     })
  //   )

  return (
    <div className="flex items-center mt-4">
      <img src={MicrosoftLogo} className="ml-4"/>
      <Select  options={stockOptions} className="ml-4 w-3/5"/>
      {/* <Input value={stockName} onChange={onChangeStockName} className="ml-4 w-3/5"/> */}
      <Input value={stockValue} onChange={onChangeStockValue} className="ml-4 w-1/5"/>
      <span className="mx-4 w-1/5">{Math.round(stockPercent)+"%"}</span>

    </div>


  );
}

export default Row;
