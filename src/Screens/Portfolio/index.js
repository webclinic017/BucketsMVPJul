import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import Chart from "../../Components/Atomic/LineChart";
import Input from "../../Components/Atomic/Input";
import Confetti from "../../Components/Atomic/Confetti";
import Button from "../../Components/Atomic/Button";
import StaticStockRow from "../../Components/Molecular/StaticStockRow";
import ShareIcon from "../../Assets/entypo_share.png";
import stocksData from "../../Data/assets.json";
import { getBucketData } from "../../Redux/Actions/bucket";
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import config from "../../Config";
import { encryptDataString, showToast } from "../../Utils";
import theme from "../../Theme";

const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const { id: bucketId } = useParams();
  const [bucketName, setBucketName] = useState("");
  const [showConfetti, setShowConfetti] = useState(false);
  const [stocks,setStocks] = useState({0: {name: "", logoUrl: "", percentage: 0}});
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const stockOptions = stocksData.map((stock)=>({label: `${stock.name} ${stock.symbol}`, logoUrl: stock.logo_url, value: stock}));
  const user = useSelector(state => state.auth.user);
  const isFetchingBucket = useSelector(state => state.bucket.isFetchingBucketData);
  const bucketData = useSelector(state => state.bucket.bucketData);
  const isLinkingAlpaca = useSelector(state => state.alpaca.isLinking);
  const alpacaAuth = useSelector(state => state.alpaca.alpacaAuth);

  useEffect(()=>{
    dispatch(getBucketData({bucketId}));
  }, []);

  useEffect(() => {
    if(Object.keys(bucketData) && !isFetchingBucket) {
      setBucketName(bucketData.name);
      let newStocks = {};
      bucketData?.stocks?.forEach((stock)=>{
        const ticker = stock.description.slice(0, stock.description.indexOf(":"));
        const name = stock.description.slice(stock.description.indexOf(":")+1, stock.description.length);
        newStocks[Object.keys(newStocks).length] = {id: stock.id, logoUrl: stock.logoUrl, name, ticker, initialWeight: stock.initialWeight, percentWeight: stock.percentWeight};
      });
      setStocks(newStocks);
    }
  }, [bucketData]);
  
  const handleOnClickBucketShare = () => {
    setShareModalVisibility(true);
    setShowConfetti(true);
    setTimeout(() => {
      setShowConfetti(false);
    }, 3000);
  }

  const onChangeStockName = (e, key) => {
    setStocks({...stocks, [key]: {...stocks[key], name: e.target.value}});
  }

  const onStockSelect = (stock, key) => {
    setStocks({...stocks, [key]: {...stocks[key], logoUrl: stock.logoUrl, name: stock.label}});
  }

  const onStockPercentIncrement = (key) => {
    if(stocks[key].initialWeight < 100) {
      setStocks({...stocks, [key]: {...stocks[key], initialWeight: stocks[key].initialWeight+1}});
    }
  }

  const onStockPercentDecrement = (key) => {
    if(stocks[key].initialWeight > 0) {
      setStocks({...stocks, [key]: {...stocks[key], initialWeight: stocks[key].initialWeight-1}});
    }
  }

  const handleOnClickBuy = () => {
    if(!alpacaAuth) {
      window.location.href = `https://app.alpaca.markets/oauth/authorize?response_type=code&client_id=${config.constants.alpacaClientId}&redirect_uri=${config.constants.redirectUri}&state=${config.constants.alpacaState}&scope=account:write%20trading`;
    } else {
      alert("Pending implementation for buy feature!")
    }
  }

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
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
                      onClick={handleOnClickBuy}
                    />
                    <span onClick={handleOnClickBucketShare} className="cursor-pointer">
                      <img src={ShareIcon} className="ml-4"/>
                    </span>
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
                      Object.keys(stocks).map((key)=>(
                        <StaticStockRow
                          rowIndex={key}
                          stockName={stocks[key].name}
                          logoUrl={stocks[key].logoUrl}
                          percentWeight={stocks[key].percentWeight}
                          initialWeight={stocks[key].initialWeight}
                        />
                      ))
                    }
                  </div>
                  <div className="w-full sm:w-full md:w-full lg:w-2/5">
                    <Chart/>
                  </div>
                </div>
              </>
        }
      </div>
      <ShareBucketPopup
        open={isShareModalVisible}
        onClose={()=>setShareModalVisibility(false)}
      />
      <Confetti recycle={showConfetti} />
    </>
  );
}

export default Portfolio;