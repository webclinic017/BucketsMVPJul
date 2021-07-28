import React, { useState, forwardRef, useImperativeHandle } from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import { useDispatch, useSelector } from 'react-redux';
import {
  placeBucketLevelOrderOnAlpaca
} from "../../../../Redux/Actions/alpaca";
import Button from "../../../Atomic/Button";
import theme from "../../../../Theme";
import Input from "../../../Atomic/Input";
import { capitalizeString } from "../../../../Utils";

const BuySell = forwardRef(({open, onClose, bucketId, stocks, ...props}, ref) => {
  const dispatch = useDispatch();
  const [type, setType] = useState("");
  const [amount, setAmount] = useState("$ ");
  const alpacaAuth = useSelector(state => state.alpaca.alpacaAuth);
  const isPlacingOrder = useSelector(state => state.alpaca.isPlacingOrder);
  const [step, setStep] = useState(1);

  useImperativeHandle(
    ref,
    () => ({
      resetComponentState () {
        setStep(1);
        setType("");
        setAmount("$ ");
      }
    }),
  );

  const handleOnChangeAmount = (e) => {
    if(e.target.value.length>=2 && e.target.value.includes("$ ") && e.target.value.indexOf("$ ")===0) {
      setAmount(e.target.value);
    }
  }

  const handleOnPressConfirm = () => {
    const data = {
      bucketId,
      type,
      value: parseFloat(amount.slice(2, amount.length)),
      accessToken: alpacaAuth.accessToken
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
                  Object.keys(stocks).map((key)=>(
                    <div className="flex justify-between mb-2 w-3/4">
                      <span
                        style={{color: type==="buy" ? theme.colors.green : theme.colors.lightPurple}}
                        className="w-1/5 text-right"
                      >
                        {capitalizeString(type)}
                      </span>
                      <span className="w-1/5 text-center">${parseFloat(amount.slice(2, amount.length))*stocks[key].targetWeight/100}</span>
                      <div className="w-3/5">
                        <span className="">{stocks[key].name}</span><br/>
                        <span className="text-gray-500">{stocks[key].ticker}</span>
                      </div>
                    </div>
                  ))
                }
                <Button
                  secondary
                  title="Confirm"
                  className="mt-6 mb-4 w-1/2"
                  isProcessing={isPlacingOrder}
                  onClick={handleOnPressConfirm}
                />
              </div>
        }
      </div>
    </Popup>
  );
});

export default BuySell;
