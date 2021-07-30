import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import StockChart from "../../Components/Atomic/StockChart";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Confetti from "../../Components/Atomic/Confetti";
import Button from "../../Components/Atomic/Button";
import StaticStockRow from "../../Components/Molecular/StaticStockRow";
import ShareIcon from "../../Assets/entypo_share.png";
import {
  getBucketData,
  setBucketValueToNull,
  getBucketCurrentValue,
  getHistoricalStockPrices
} from "../../Redux/Actions/bucket";
import MenuIcon from "../../Assets/Icons/menu.png";
import OptionsIcon from "../../Assets/Icons/options.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import AlpacaLoginPopup from "../../Components/Molecular/Popups/AlpacaLogin";
import BuySellPopup from "../../Components/Molecular/Popups/BuySell";
import theme from "../../Theme";

const Portfolio = (props)=> {
  const buySellPopupRef = useRef();
  const dispatch = useDispatch();
  const { id: bucketId } = useParams();
  const [bucketName, setBucketName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [isAlpacaModalVisible, setAlpacaModalVisibility] = useState(false);
  const [isBuySellModalVisible, setBuySellModalVisibility] = useState(false);
  const [bucketCostBasis, setBucketCostBasis] = useState(0);
  const user = useSelector(state => state.auth.user);
  const isFetchingBucket = useSelector(state => state.bucket.isFetchingBucketData);
  const isFetchingBucketValue = useSelector(state => state.bucket.isFetchingBucketValue);
  const bucketData = useSelector(state => state.bucket.bucketData);
  const bucketValue = useSelector(state => state.bucket.bucketValue);
  const isLinkingAlpaca = useSelector(state => state.alpaca.isLinking);
  const alpacaAuth = useSelector(state => state.alpaca.alpacaAuth);
  const bucketHistoricalPrices = useSelector(state => state.bucket.bucketHistoricalPrices);
  const isFetchingBucketHistoricalPrices = useSelector(state => state.bucket.isFetchingBucketHistoricalPrices);

  useEffect(()=>{
    dispatch(getBucketData({bucketId}, (bucketValue)=>{
      if(bucketValue>0) {
        dispatch(getBucketCurrentValue({bucketId}));
      } else {
        dispatch(setBucketValueToNull());
      }
    }));
  }, []);

  useEffect(() => {
    if(Object.keys(bucketData) && !isFetchingBucket) {
      setBucketName(bucketData.name);
      if(bucketData.hasOwnProperty("stocks") && bucketData.stocks.length) {
        setStocks(bucketData.stocks);
        setBucketCostBasis(bucketData.stocks.reduce((total, stock)=>(stock.costBasis+total), 0));
        dispatch(getHistoricalStockPrices({stocks: bucketData.stocks}));
      }
    }
  }, [bucketData]);

  const handleOnClickBucketShare = () => {
    setShareModalVisibility(true);
    setShowConfetti(true);
  }

  const handleOnClickBuySell = () => {
    if(!alpacaAuth) {
      setAlpacaModalVisibility(true);
    } else {
      buySellPopupRef.current.resetComponentState();
      setBuySellModalVisibility(true);
    }
  }

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  const handleOnClickEdit = () => {
    props.history.push(`/edit-bucket/${bucketData.id}`);
  }

  const handleOnClickRebalance = () => {

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
                  <h3 className="font-bold text-gray-400 text-4xl">{bucketName}</h3>
                  <div className="flex items-center justify-between">
                    <Button
                      title="Buy/Sell"
                      isProcessing={isLinkingAlpaca}
                      onClick={handleOnClickBuySell}
                    />
                    <span onClick={handleOnClickBucketShare} className="cursor-pointer">
                      <img src={ShareIcon} className="mx-4"/>
                    </span>
                    <DropdownMenu
                      trigger={<img src={OptionsIcon} className="mx-1 mt-1 object-contain cursor-pointer w-5 h-5"/> }
                    >
                      <DropdownItemGroup>
                        <DropdownItem onMouseDown={handleOnClickEdit}>Edit</DropdownItem>
                        <DropdownItem onMouseDown={handleOnClickRebalance}>Rebalance</DropdownItem>
                      </DropdownItemGroup>
                    </DropdownMenu>
                    <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
                  </div>
                </div>
                <div className="block sm:block md:flex justify-between mt-6">
                  <div className="w-full sm:w-full md:w-full lg:w-2/5 ">
                    {
                      stocks.map((stock, index)=>(
                        <StaticStockRow
                          rowIndex={index}
                          stock={stock}
                        />
                      ))
                    }
                  </div>
                  <div className="w-full sm:w-full md:w-full lg:w-2/5">
                    {
                      !isFetchingBucketValue && bucketValue
                        &&
                          <div className="flex justify-center mb-4">
                            <span className="font-bold text-lg text-gray-500">${bucketValue.toFixed(2)}</span>
                            <span className="text-xl text-gray-400 mx-1">|</span>
                            <span
                              style={{color: bucketValue-bucketCostBasis>0 ? theme.colors.green : theme.colors.red}}
                              className="font-bold text-lg"
                            >
                              {(bucketValue-bucketCostBasis>0) && "+"}
                              {(bucketValue-bucketCostBasis).toFixed(2)}
                            </span>
                            <span className="text-xl text-gray-400 mx-1">|</span>
                            <span
                              style={{color: ((bucketValue-bucketCostBasis)/bucketCostBasis)>0 ? theme.colors.green : theme.colors.red}}
                              className="font-bold text-lg"
                            >
                              {(((bucketValue-bucketCostBasis)/bucketCostBasis)>0) && "+"}
                              {(((bucketValue-bucketCostBasis)/bucketCostBasis)).toFixed(2)}%
                            </span>
                          </div>
                    }
                    {
                      !isFetchingBucketHistoricalPrices && bucketHistoricalPrices
                        &&
                          <StockChart
                            data={bucketHistoricalPrices}
                          />
                    }
                  </div>
                </div>
              </>
        }
      </div>
      <BuySellPopup
        ref={buySellPopupRef}
        bucketId={bucketId}
        open={isBuySellModalVisible}
        onClose={()=>setBuySellModalVisibility(false)}
        stocks={stocks}
      />
      <AlpacaLoginPopup
        open={isAlpacaModalVisible}
        onClose={()=>setAlpacaModalVisibility(false)}
      />
      <ShareBucketPopup
        open={isShareModalVisible}
        onClose={()=>setShareModalVisibility(false)}
      />
      {
        showConfetti
          &&
            <Confetti
              recycle={false}
              onConfettiComplete={()=>setShowConfetti(false)}
            />
      }
    </>
  );
}

export default Portfolio;
