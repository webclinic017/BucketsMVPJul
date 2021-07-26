import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import Chart from "../../Components/Atomic/LineChart";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Confetti from "../../Components/Atomic/Confetti";
import Button from "../../Components/Atomic/Button";
import StaticStockRow from "../../Components/Molecular/StaticStockRow";
import ShareIcon from "../../Assets/entypo_share.png";
import stocksData from "../../Data/assets.json";
import {
  getBucketData,
  getHistoricalStockPrices
} from "../../Redux/Actions/bucket";
import MenuIcon from "../../Assets/Icons/menu.png";
import OptionsIcon from "../../Assets/Icons/options.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import AlpacaLoginPopup from "../../Components/Molecular/Popups/AlpacaLogin";
import BuySellPopup from "../../Components/Molecular/Popups/BuySell";
import config from "../../Config";
import theme from "../../Theme";

const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const { id: bucketId } = useParams();
  const [bucketName, setBucketName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [stocks, setStocks] = useState([]);
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [isAlpacaModalVisible, setAlpacaModalVisibility] = useState(false);
  const [isBuySellModalVisible, setBuySellModalVisibility] = useState(false);
  const user = useSelector(state => state.auth.user);
  const isFetchingBucket = useSelector(state => state.bucket.isFetchingBucketData);
  const bucketData = useSelector(state => state.bucket.bucketData);
  const isLinkingAlpaca = useSelector(state => state.alpaca.isLinking);
  const alpacaAuth = useSelector(state => state.alpaca.alpacaAuth);
  const isFetchingBucketHistoricalPrices = useSelector(state => state.alpaca.isFetchingBucketHistoricalPrices);

  useEffect(()=>{
    dispatch(getBucketData({bucketId}));
  }, []);

  useEffect(() => {
    if(Object.keys(bucketData) && !isFetchingBucket) {
      setBucketName(bucketData.name);
      if(bucketData.hasOwnProperty("stocks")) {
        setStocks(bucketData.stocks);
        dispatch(getHistoricalStockPrices({stocks: bucketData.stocks}));
      }
    }
  }, [bucketData]);

  const handleOnClickBucketShare = () => {
    setShareModalVisibility(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }

  const handleOnClickBuySell = () => {
    if(!alpacaAuth) {
      setAlpacaModalVisibility(true);
    } else {
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
                  <h3 className="font-bold text-gray-400 text-4xl">Buckets</h3>
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
                    <div className="flex items-center w-full">
                      <span className="text-2xl text-gray-600">{bucketName}</span>
                      <div className="flex w-2/5 justify-center">
                        {/* <div className={`${totalPercentage < 100 ? 'text-gray-500' : totalPercentage > 100 ? 'text-red-600' : 'text-green-600'}`}>Total: {totalPercentage} %</div> */}
                      </div>
                    </div>
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
                      !isFetchingBucketHistoricalPrices
                        &&
                          <Chart/>
                    }
                  </div>
                </div>
              </>
        }
      </div>
      <BuySellPopup
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
      <Confetti recycle={showConfetti} />
    </>
  );
}

export default Portfolio;
