import React, { useState } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch } from 'react-redux';
import {
  placeBucketLevelOrderOnAlpaca
} from "../../../../Redux/Actions/alpaca";
import Button from "../../../Atomic/Button";
import theme from "../../../../Theme";
import Input from "../../../Atomic/Input";

const stocks = [
  {name: "Microsoft Corporation Common Stock", ticker: "MSFT", amount: 200, transactionType: "Buy"},
  {name: "Amazon.com, Inc. Common Stock", ticker: "AMZN", amount: 100, transactionType: "Sell"},
  {name: "Facebook, Inc. Class A Common Stock", ticker: "FB", amount: 300, transactionType: "Buy"},
  {name: "Apple Inc. Common Stock", ticker: "AAPL", amount: 400, transactionType: "Sell"},
];

const BuySell = ({open, onClose, bucketId, ...props}) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("$ ");
  const [step, setStep] = useState(1);

  const handleOnChangeAmount = (e) => {
    if(e.target.value.length>=2 && e.target.value.includes("$ ")) {
      setAmount(e.target.value);
    }
  }

  const handleOnPressConfirm = () => {
    const data = {
      bucketId,
      type,
      value: parseFloat(amount.slice(2, amount.length)),
      accessToken: ""
    };
    dispatch(placeBucketLevelOrderOnAlpaca(data, ()=>{onClose()}));
  }

  const handleOnClickBuy = () => {
    setType("buy");
    setStep(2);
  }

  const handleOnClickSell = () => {
    setType("sell");
    setStep(2);
  }

  return (
    <Popup open={open} onClose={onClose} closeOnDocumentClick position="center" modal>
      <div className="flex flex-col items-center w-full h-full my-12 px-7 rounded-md">
        <h2
          style={{color: theme.colors.lightPurple}}
          className="text-center text-3xl font-bold"
        >Step {step} of 2</h2>
        {
          step === 1
            ?
              <>
                <div
                  className="flex items-center justify-center mt-8 mb-4"
                >
                  <span className="font-bold text-lg">Cash available to trade: $2000</span>
                </div>
                <Input
                  className="w-32 text-center font-bold text-xl shadow-lg"
                  value={amount}
                  onChange={handleOnChangeAmount}
                />
                <Button
                  title="Buy"
                  className="mt-6 mb-4 w-1/2"
                  onClick={handleOnClickBuy}
                />
                <Button
                  secondary
                  title="Sell"
                  className="w-1/2"
                  onClick={handleOnClickSell}
                />
              </>
            :
              <div className="mt-4 w-full flex flex-col items-center">
                {
                  stocks.map((stock)=>(
                    <div className="flex justify-between mb-2 w-3/4">
                      <span
                        style={{color: stock.transactionType==="Buy" ? theme.colors.green : theme.colors.lightPurple}}
                        className="w-1/5 text-right"
                      >
                        {stock.transactionType}
                      </span>
                      <span className="w-1/5 text-center">${stock.amount}</span>
                      <div className="w-3/5">
                        <span className="">{stock.name}</span><br/>
                        <span className="text-gray-500">{stock.ticker}</span>
                      </div>
                    </div>
                  ))
                }
                <Button
                  secondary
                  title="Confirm"
                  className="mt-6 mb-4 w-1/2"
                  onClick={handleOnPressConfirm}
                />
              </div>
        }
      </div>
    </Popup>
  );
}

export default BuySell;
