import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import moment from 'moment';
import MoonLoader from 'react-spinners/MoonLoader';
import ShareIcon from "../../Assets/entypo_share.png";
import MenuIcon from "../../Assets/Icons/menu.png";
import Input from "../../Components/Atomic/Input";
import Button from "../../Components/Atomic/Button";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import AlpacaLoginPopup from "../../Components/Molecular/Popups/AlpacaLogin";
import BuySellPopup from "../../Components/Molecular/Popups/BuySell";
import {
  placeStockLevelOrderOnAlpaca
} from "../../Redux/Actions/alpaca";
import theme from "../../Theme";

const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const { id: stockId } = useParams();
  const [amount, setAmount] = useState("$ ");
  const [type, setType] = useState("");
  const [orders, setOrders] = useState([]);
  const [totalStockValue, setTotalStockValue] = useState(0);
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [isAlpacaModalVisible, setAlpacaModalVisibility] = useState(false);
  const [isBuySellModalVisible, setBuySellModalVisibility] = useState(false);
  const user = useSelector(state => state.auth.user);
  const isFetchingBucket = useSelector(state => state.bucket.isFetchingBucketData);
  const bucketData = useSelector(state => state.bucket.bucketData);
  const isLinkingAlpaca = useSelector(state => state.alpaca.isLinking);
  const alpacaAuth = useSelector(state => state.alpaca.alpacaAuth);
  const isPlacingOrder = useSelector(state => state.alpaca.isPlacingOrder);
  
  useEffect(() => {
    setOrders(props.location.state.stock.orders);
    setTotalStockValue(props.location.state.stock.totalNoOfShares*props.location.state.stock.latestPrice);
  }, [props]);

  const handleOnClickBucketShare = () => {
    setShareModalVisibility(true);
  }

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  const handleOnClickRebalance = () => {

  }

  const handleOnChangeAmount = (e) => {
    if(e.target.value.length>=2 && e.target.value.includes("$ ") && e.target.value.indexOf("$ ")===0) {
      setAmount(e.target.value);
    }
  }

  const handleOnClickBuy = () => {
    if(!alpacaAuth) {
      setAlpacaModalVisibility(true);
    } else if(!isPlacingOrder) {
      setType("buy");
      const data = {
        stockId,
        type: "buy",
        value: parseFloat(amount.slice(2, amount.length)),
        accessToken: alpacaAuth.accessToken
      };
      dispatch(placeStockLevelOrderOnAlpaca(data, ()=>setAmount("$ ")));
    }
  }

  const handleOnClickSell = () => {
    if(!alpacaAuth) {
      setAlpacaModalVisibility(true);
    } else if(!isPlacingOrder) {
      setType("sell");
      const data = {
        stockId,
        type: "sell",
        value: parseFloat(amount.slice(2, amount.length)),
        accessToken: alpacaAuth.accessToken
      };
      dispatch(placeStockLevelOrderOnAlpaca(data, ()=>setAmount("$ ")));
    }
  }

  return(
    <>
      <div className="p-11 flex flex-col min-h-screen">
        {
          isFetchingBucket
            ?
              <div className="flex my-auto max-w-screen justify-center items-center">
                <MoonLoader size={40} color={theme.colors.green} loading={true} />
              </div>
            :
              <>
                <div className="flex justify-between">
                  <h3 className="font-bold text-gray-400 text-4xl">{props.location.state.stock.ticker} {bucketData.name}</h3>
                  <div className="flex items-center justify-between">
                    {
                      bucketData.value>0
                        &&
                          <div>
                            <span className="font-bold text-lg text-gray-500">${totalStockValue.toFixed(2)}</span>
                            <span className="text-xl text-gray-400 mx-1">|</span>
                            <span
                              style={{color: totalStockValue-props.location.state.stock.costBasis>0 ? theme.colors.green : theme.colors.red}}
                              className="font-bold text-lg"
                            >
                              {(totalStockValue-props.location.state.stock.costBasis>0) && "+"}
                              {(totalStockValue-props.location.state.stock.costBasis).toFixed(2)}
                            </span>
                            <span className="text-xl text-gray-400 mx-1">|</span>
                            <span
                              style={{color: ((totalStockValue-props.location.state.stock.costBasis)/props.location.state.stock.costBasis)>0 ? theme.colors.green : theme.colors.red}}
                              className="font-bold text-lg"
                            >
                              {(((totalStockValue-props.location.state.stock.costBasis)/props.location.state.stock.costBasis)>0) && "+"}
                              {(((totalStockValue-props.location.state.stock.costBasis)/props.location.state.stock.costBasis)).toFixed(2)}%
                            </span>
                          </div>
                    }
                    {/* <span onClick={handleOnClickBucketShare} className="cursor-pointer">
                      <img src={ShareIcon} className="mx-4"/>
                    </span> */}
                    <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
                  </div>
                </div>
                <div className="block sm:block md:flex justify-between mt-6">
                  <div className="w-full sm:w-full md:w-full lg:w-2/5 ">
                    <div className="flex justify-around">
                      <div className="py-2 px-8 rounded-md" style={{backgroundColor: theme.colors.red}}>
                        <span className="my-2 text-white font-bold">Avg Cost</span><br/>
                        <p className="text-center mb-2 text-white">${props.location.state.stock.overallPrice.toFixed(2)}</p>
                      </div>
                      <div className="py-2 px-8 rounded-md" style={{backgroundColor: theme.colors.lighterGray}}>
                        <span className="my-2 font-bold text-gray-700"># of shares</span><br/>
                        <p className="text-center mb-2 mx-auto">{props.location.state.stock.totalNoOfShares.toFixed(2)}</p>
                      </div>
                      <div className="py-2 px-8 rounded-md" style={{backgroundColor: theme.colors.lightPurple}}>
                        <span className="my-2 text-white font-bold">Cost Basis</span><br/>
                        <p className="text-center mb-2 text-white">${props.location.state.stock.costBasis.toFixed(2)}</p>
                      </div>
                    </div>
                    <div className="mt-4 w-full flex flex-col items-center">
                      <div className="flex justify-between mb-4 w-full">
                        <span className="w-1/3 font-bold text-gray-600 text-center">
                          Date
                        </span>
                        <span className="w-1/3 font-bold text-gray-600 text-center"># of shares</span>
                        <span className="w-1/3 font-bold text-gray-600 text-center">price ($)</span>
                      </div>
                      {
                        orders.map((order)=>(
                          <div className="flex justify-between mb-3 w-full">
                            <span className="w-1/3 text-center">
                              {moment(order.timestamp).format("MMM Do YY")}
                            </span>
                            {
                              order.type==="buy"
                                ?
                                  <span style={{color: theme.colors.green}} className="w-1/3 text-center">+{order.qty.toFixed(2)}</span>
                                :
                                  <span style={{color: theme.colors.lightPurple}} className="w-1/3 text-center">{order.qty.toFixed(2)}</span>
                            }
                            <span
                              style={{color: theme.colors.lightPurple}}
                              className="w-1/3 text-center"
                            >
                              ${order.price}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div style={{maxHeight: "80vh"}} className="w-full sm:w-full md:w-full lg:w-2/5 flex flex-col items-center justify-center">
                    <Input
                      className="w-32 text-center font-bold text-xl shadow-lg"
                      value={amount}
                      onChange={handleOnChangeAmount}
                    />
                    <Button
                      title="Buy"
                      className="mt-6 mb-4 w-1/2"
                      onClick={handleOnClickBuy}
                      isProcessing={type==="buy" && isPlacingOrder}
                    />
                    <Button
                      secondary
                      title="Sell"
                      className="w-1/2"
                      onClick={handleOnClickSell}
                      isProcessing={type==="sell" && isPlacingOrder}
                    />
                  </div>
                </div>
              </>
        }
      </div>
      <BuySellPopup
        open={isBuySellModalVisible}
        onClose={()=>setBuySellModalVisibility(false)}
      />
      <AlpacaLoginPopup
        open={isAlpacaModalVisible}
        onClose={()=>setAlpacaModalVisibility(false)}
      />
      <ShareBucketPopup
        open={isShareModalVisible}
        onClose={()=>setShareModalVisibility(false)}
      />
    </>
  );
}

export default Portfolio;