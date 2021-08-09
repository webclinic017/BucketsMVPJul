import React from 'react';
import Popup from 'reactjs-popup';
import 'reactjs-popup/dist/index.css';
import theme from '../../../../Theme';
import config from "../../../../Config";
import {loginRobinhood} from "../../../../Redux/Actions/bucket";
import { useDispatch} from 'react-redux';


const AlpacaLoginPopup = ({open, onClose, ...props}) => {
  const dispatch = useDispatch();
  const handleOnClickLinkAlpaca = () => {
    setTimeout(() => {
      onClose();
    }, 500);
    window.location.href = `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${config.constants.alpacaClientId}&redirect_uri=${config.constants.redirectUri}&state=${config.constants.alpacaState}&scope=account:write%20trading`;
  }
  const handleOnLinkRobinhood = () => {
    setTimeout(() => {
      onClose();
    }, 500);
    dispatch(loginRobinhood());
  }

  return (
    <Popup open={open} onClose={onClose} closeOnDocumentClick position="center" modal>
      <div className="flex flex-col items-center w-full h-full my-12 px-7 rounded-md">
        <h2
          style={{color: theme.colors.lightPurple}}
          className="text-center text-3xl font-bold"
        >Link your brokerage account!</h2>
        <div
          className="flex items-center justify-center mt-16 mb-4"
        >
          <div
            onClick={handleOnClickLinkAlpaca}
            style={{backgroundColor: theme.colors.yellow}}
            className="cursor-pointer rounded-md py-4 px-6 m-2"
          >
            <span className="font-bold text-lg hover:text-white">Link Alpaca</span>
          </div>
          <div
            onClick={handleOnLinkRobinhood}
            style={{backgroundColor: theme.colors.green}}
            className="cursor-pointer rounded-md py-4 px-6 m-2"
          >
            <span className="font-bold text-lg hover:text-white">Login Robinhood</span>
          </div>
        </div>
        <h2
          style={{color: theme.colors.lightPurple}}
          className="text-center cursor-pointer text-2xl font-bold"
        >to get started with stock trading</h2>
      </div>
    </Popup>
  );
}

export default AlpacaLoginPopup;
