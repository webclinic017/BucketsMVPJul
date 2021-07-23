import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import Chart from "../../Components/Atomic/LineChart";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Button from "../../Components/Atomic/Button";
import StaticStockRow from "../../Components/Molecular/StaticStockRow";
import ShareIcon from "../../Assets/entypo_share.png";
import stocksData from "../../Data/assets.json";
import { getBucketData } from "../../Redux/Actions/bucket";
import MenuIcon from "../../Assets/Icons/menu.png";
import Input from "../../Components/Atomic/Input";
import OptionsIcon from "../../Assets/Icons/options.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import AlpacaLoginPopup from "../../Components/Molecular/Popups/AlpacaLogin";
import BuySellPopup from "../../Components/Molecular/Popups/BuySell";
import config from "../../Config";
import theme from "../../Theme";

const dummyStocks = [
  {date: "1st June", noOfShares: 2.4, amount: 200},
  {date: "4th April", noOfShares: 1.4, amount: 100},
  {date: "2nd April", noOfShares: 1.5, amount: 300},
  {date: "1st March", noOfShares: 1.2, amount: 400}
];

const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const { id: bucketId } = useParams();
  const [amount, setAmount] = useState("$ ");
  const [bucketName, setBucketName] = useState("");
  const [stocks,setStocks] = useState({0: {name: "", logoUrl: "", percentage: 0}});
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [isAlpacaModalVisible, setAlpacaModalVisibility] = useState(false);
  const [isBuySellModalVisible, setBuySellModalVisibility] = useState(false);
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
      let ticker, name = "";
      bucketData?.stocks?.forEach((stock)=>{
        ticker = stock.description.slice(0, stock.description.indexOf(":"));
        name = stock.description.slice(stock.description.indexOf(":")+1, stock.description.length);
        newStocks[Object.keys(newStocks).length] = {id: stock.id, logoUrl: stock.logoUrl, name, ticker, initialWeight: stock.initialWeight, percentWeight: stock.percentWeight};
      });
      setStocks(newStocks);
    }
  }, [bucketData]);
  
  const handleOnClickBucketShare = () => {
    setShareModalVisibility(true);
  }

  const handleOnClickBuy = () => {
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

  const handleOnChangeAmount = (e) => {
    if(e.target.value.length>=2 && e.target.value.includes("$ ")) {
      setAmount(e.target.value);
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
                  <h3 className="font-bold text-gray-400 text-4xl">Microsoft in Fav Tech Names</h3>
                  <div className="flex items-center justify-between">
                    <div>
                      <span className="font-bold text-lg text-gray-500">$24,433.84</span>
                      <span className="text-xl text-gray-400"> | </span>
                      <span style={{color: theme.colors.green}} className="font-bold text-lg">+4,756.21</span>
                      <span className="text-xl text-gray-400"> | </span>
                      <span style={{color: theme.colors.green}} className="font-bold text-lg">+7.89%</span>
                    </div>
                    <span onClick={handleOnClickBucketShare} className="cursor-pointer">
                      <img src={ShareIcon} className="mx-4"/>
                    </span>
                    <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
                  </div>
                </div>
                <div className="block sm:block md:flex justify-between mt-6">
                  <div className="w-full sm:w-full md:w-full lg:w-2/5 ">
                    <div className="flex justify-around">
                      <div className="py-2 px-8 rounded-md" style={{backgroundColor: theme.colors.red}}>
                        <span className="my-2 text-white">Avg Cost</span><br/>
                        <p className="text-center mb-2 text-white">$268,65</p>
                      </div>
                      <div className="py-2 px-8 rounded-md" style={{backgroundColor: theme.colors.lighterGray}}>
                        <span className="my-2"># of shares</span><br/>
                        <p className="text-center mb-2 mx-auto">73</p>
                      </div>
                      <div className="py-2 px-8 rounded-md" style={{backgroundColor: theme.colors.lightPurple}}>
                        <span className="my-2 text-white">Cost Basis</span><br/>
                        <p className="text-center mb-2 text-white">$9,000</p>
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
                        dummyStocks.map((stock)=>(
                          <div className="flex justify-between mb-3 w-full">
                            <span className="w-1/3 text-center">
                              {stock.date}
                            </span>
                            <span className="w-1/3 text-center">${stock.noOfShares}</span>
                            <span
                              style={{color: theme.colors.lightPurple}}
                              className="w-1/3 text-center"
                            >
                              ${stock.amount}
                            </span>
                          </div>
                        ))
                      }
                    </div>
                  </div>
                  <div className="w-full sm:w-full md:w-full lg:w-2/5 flex flex-col items-center justify-center">
                    <Input
                      className="w-32 text-center font-bold text-xl shadow-lg"
                      value={amount}
                      onChange={handleOnChangeAmount}
                    />
                    <Button
                      title="Buy"
                      className="mt-6 mb-4 w-1/2"
                      onClick={()=>{}}
                    />
                    <Button
                      secondary
                      title="Sell"
                      className="w-1/2"
                      onClick={()=>{}}
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