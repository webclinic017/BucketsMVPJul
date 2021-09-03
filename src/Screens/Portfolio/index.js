import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import StockChart from "../../Components/Atomic/StockChart";
import StockChartNew from "../../Components/Atomic/HighChart";
import DropdownMenu, { DropdownItem, DropdownItemGroup } from '@atlaskit/dropdown-menu';
import Confetti from "../../Components/Atomic/Confetti";
import Button from "../../Components/Atomic/Button";
import PyramidChart from "../../Components/Atomic/PyramidChart";
import PieChart from "../../Components/Atomic/PieChart";
import GuageChart from "../../Components/Atomic/GuageChart";
import StaticStockRow from "../../Components/Molecular/StaticStockRow";
// import ShareIcon from "../../Assets/entypo_share.png";
import ShareIcon from "../../Assets/brownshare.png";



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
import stocksData from "../../Data/assets.json";
import {Helmet} from "react-helmet";
import Footer from "../../Components/Molecular/Footer"; 
import {ChatWidget} from "@papercups-io/chat-widget";




const colors = ["#5AE579", "#FFBA69", "#FF708B", "#8676FF", "#F0008B", "#424242", "#90E500", "#993874", "#383874", "#FFD700", "#a0a0a0"]

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
  const [percentReturn, setPercentReturn] = useState(null);
  const [bucketBeta, setBucketBeta] = useState(null);
  const [bucketSize, setBucketSize] = useState(null);
  const [gData, setGData] = useState(null);
  const [bucketSectorWeights, setBucketSectorWeights] = useState(null);
  const user = useSelector(state => state.auth.user);
  const isFetchingBucket = useSelector(state => state.bucket.isFetchingBucketData);
  const isFetchingBucketValue = useSelector(state => state.bucket.isFetchingBucketValue);
  const bucketData = useSelector(state => state.bucket.bucketData);
  const bucketValue = useSelector(state => state.bucket.bucketValue);
  const isLinkingAlpaca = useSelector(state => state.alpaca.isLinking);
  const alpacaAuth = useSelector(state => state.alpaca.alpacaAuth);
  const bucketHistoricalPrices = useSelector(state => state.bucket.bucketHistoricalPrices );
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
        let sectorWeights = {};
        let beta = 0;
        let size = {
          small: 0,
          medium: 0,
          large: 0
        };
        bucketData.stocks.forEach((oStock) => {
          const fStock = stocksData.filter((iStock)=>(oStock.ticker===iStock.symbol))[0];
          if(fStock.beta!==null) {
            beta += ((oStock.targetWeight/100)*parseFloat(fStock.beta));
          }
          if(fStock.size_type!==null && fStock.size_type.toLowerCase() === "small") {
            size = {...size, small: size.small+oStock.targetWeight};
          } else if(fStock.size_type!==null && fStock.size_type.toLowerCase() === "medium") {
            size = {...size, medium: size.medium+oStock.targetWeight};
          } else if(fStock.size_type!==null && fStock.size_type.toLowerCase() === "large") {
            size = {...size, large: size.large+oStock.targetWeight};
          }
          if(fStock.sector_basic_materials) {
            if(sectorWeights.hasOwnProperty("Basic Materials")) {
              sectorWeights["Basic Materials"] += oStock.targetWeight*parseFloat(fStock.sector_basic_materials);
            } else {
              sectorWeights["Basic Materials"] = oStock.targetWeight*parseFloat(fStock.sector_basic_materials);
            }
          }
          if(fStock.sector_consumer_cyclical) {
            if(sectorWeights.hasOwnProperty("Consumer Cyclical")) {
              sectorWeights["Consumer Cyclical"] += oStock.targetWeight*parseFloat(fStock.sector_consumer_cyclical);
            } else {
              sectorWeights["Consumer Cyclical"] = oStock.targetWeight*parseFloat(fStock.sector_consumer_cyclical);
            }
          }
          if(fStock.sector_financial_services) {
            if(sectorWeights.hasOwnProperty("Financial Services")) {
              sectorWeights["Financial Services"] += oStock.targetWeight*parseFloat(fStock.sector_financial_services);
            } else {
              sectorWeights["Financial Services"] = oStock.targetWeight*parseFloat(fStock.sector_financial_services);
            }
          }
          if(fStock.sector_real_estate) {
            if(sectorWeights.hasOwnProperty("Real Estate")) {
              sectorWeights["Real Estate"] += oStock.targetWeight*parseFloat(fStock.sector_real_estate);
            } else {
              sectorWeights["Real Estate"] = oStock.targetWeight*parseFloat(fStock.sector_real_estate);
            }
          }
          if(fStock.sector_consumer_defensive) {
            if(sectorWeights.hasOwnProperty("Consumer Defensive")) {
              sectorWeights["Consumer Defensive"] += oStock.targetWeight*parseFloat(fStock.sector_consumer_defensive);
            } else {
              sectorWeights["Consumer Defensive"] = oStock.targetWeight*parseFloat(fStock.sector_consumer_defensive);
            }
          }
          if(fStock.sector_healthcare) {
            if(sectorWeights.hasOwnProperty("Sector Healthcare")) {
              sectorWeights["Sector Healthcare"] += oStock.targetWeight*parseFloat(fStock.sector_healthcare);
            } else {
              sectorWeights["Sector Healthcare"] = oStock.targetWeight*parseFloat(fStock.sector_healthcare);
            }
          }
          if(fStock.sector_basic_materials) {
            if(sectorWeights.hasOwnProperty("Sector Utilities")) {
              sectorWeights["Sector Utilities"] += oStock.targetWeight*parseFloat(fStock.sector_basic_materials);
            } else {
              sectorWeights["Sector Utilities"] = oStock.targetWeight*parseFloat(fStock.sector_basic_materials);
            }
          }
          if(fStock.sector_communication_services) {
            if(sectorWeights.hasOwnProperty("Communication Services")) {
              sectorWeights["Communication Services"] += oStock.targetWeight*parseFloat(fStock.sector_communication_services);
            } else {
              sectorWeights["Communication Services"] = oStock.targetWeight*parseFloat(fStock.sector_communication_services);
            }
          }
          if(fStock.sector_energy) {
            if(sectorWeights.hasOwnProperty("Sector Energy")) {
              sectorWeights["Sector Energy"] += oStock.targetWeight*parseFloat(fStock.sector_energy);
            } else {
              sectorWeights["Sector Energy"] = oStock.targetWeight*parseFloat(fStock.sector_energy);
            }
          }
          if(fStock.sector_industrials) {
            if(sectorWeights.hasOwnProperty("Industrials")) {
              sectorWeights["Industrials"] += oStock.targetWeight*parseFloat(fStock.sector_industrials);
            } else {
              sectorWeights["Industrials"] = oStock.targetWeight*parseFloat(fStock.sector_industrials);
            }
          }
          if(fStock.sector_technology) {
            if(sectorWeights.hasOwnProperty("Technology")) {
              sectorWeights["Technology"] += oStock.targetWeight*parseFloat(fStock.sector_technology);
            } else {
              sectorWeights["Technology"] = oStock.targetWeight*parseFloat(fStock.sector_technology);
            }
          }
        });
        setBucketSectorWeights(sectorWeights);
        console.log({sectorWeights});
        setBucketBeta(beta);
        setBucketSize(size);
      }
    } 
  }, [bucketData]);

  useEffect(()=>{
    if(stocks.length && bucketHistoricalPrices && !isFetchingBucketHistoricalPrices) {
      let valueArray = []
      console.log(bucketHistoricalPrices)
      
      bucketData.stocks.map(stock => { 
      console.log(stock)
      console.log(stock.targetWeight)
      const amountInvested = 10000 * (stock.targetWeight/100)
      const ticker = stock.ticker
      stock.numberDummyShares = bucketHistoricalPrices[ticker] ? amountInvested/(bucketHistoricalPrices[ticker][bucketHistoricalPrices[ticker].length - 1].close) : 'FAILSAFE-VAULE';
      
      if (typeof bucketHistoricalPrices[ticker] !== 'undefined') {
        console.log(bucketHistoricalPrices[ticker])
        bucketHistoricalPrices[ticker].forEach((price) => {
          price.value = stock.numberDummyShares * price.close
          price.date = new Date(price.date).getTime()
          valueArray.push(price)
        })
      }
        
      });

      const res = Array.from(valueArray.reduce(
        (m, {date, value}) => m.set(date, (m.get(date) || 0) + value), new Map
      ), ([date, value]) => ({date, value}));
      // console.log(res);

      var outputData = res.map( Object.values );
      const gdata = outputData.reverse();
      console.log({gdata});
      setGData(gdata)

      // console.log(valueArray)
      // for (const [key, value] of Object.entries(res)) {
      //   const map = value.map((entry)=>([entry.date, entry.value]));
      //   return map.reverse()
      // }
    }
  }, [stocks, bucketHistoricalPrices, isFetchingBucketHistoricalPrices]);

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

  const bucketYield = () => {
    const yieldWeight = []
    stocks.map(stock => {
      const weight = stock.targetWeight / 100
      const metric = stocksData.filter(obj => obj.symbol === stock.ticker)
      yieldWeight.push(metric[0].fund_yield * weight)
    })
    return yieldWeight.reduce(function(a,b){return a + b;}, 0).toFixed(2)+"%";
  }

  const getPE = () => {
    const priceEarnings = []
    stocks.map(stock => {
      const weight = stock.targetWeight / 100
      const metric = stocksData.filter(obj => obj.symbol === stock.ticker)
      priceEarnings.push(metric[0].price_earnings_ratio * weight)
    })
    return priceEarnings.reduce(function(a,b){return a + b;}, 0).toFixed(0);
  }

  const getME = () => {
    const managementExpense = []
    stocks.map(stock => {
      const weight = stock.targetWeight / 100
      const metric = stocksData.filter(obj => obj.symbol === stock.ticker)
      managementExpense.push(metric[0].fund_net_annual_expense_ratio * weight)
    })
    const final = managementExpense.reduce(function(a,b){return a + b;}, 0).toFixed(2)
    return final;
  }

  const getMESavings = () => {
    const dollarsSaved = 10000 * (0.4 - getME())/100
    return dollarsSaved.toFixed(2)
  }

  const xCallback = (value) => {console.log(value)};

  
  

  // const getDataForPyramidChart = () => {
  //   const response = Object.entries(bucketSize).map(([key, value])=>({
  //     value: value,
  //     name: key,
  //     fill: key==="large" ? theme.colors.green : key==="medium" ? theme.colors.lightPurple : theme.colors.red
  //   })).filter((item)=>item.value!==0).sort((a, b)=>(a.value-b.value));
  //   console.log({response});
  //   return response;
  // }

  const calculatePercentReturn = (eMin, eMax) => {
    eMax = gData.filter((entry)=>entry[0]===eMax)[0][1];
    eMin = gData.filter((entry)=>entry[0]===eMin)[0][1];
    const percentRet = (((eMax-eMin)/eMin)*100).toFixed(0);
    setPercentReturn(percentRet);
  }

  return(
    <>
      <div className="p-11 flex flex-col min-h-screen">

        {
          isFetchingBucket
            ?
              <div className="flex my-auto max-w-screen justify-center items-center">
                <MoonLoader size={40} color={theme.colors.tuscany} loading={true} />
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
                            {
                      user && user._id===bucketData.userId
                        &&
                          <>
                            <DropdownMenu
                              trigger={<img src={OptionsIcon} className="mx-1 mt-1 object-contain cursor-pointer w-5 h-5"/> }
                            >
                              <DropdownItemGroup>
                                <DropdownItem onMouseDown={handleOnClickEdit}>Edit</DropdownItem>
                                {/* <DropdownItem onMouseDown={handleOnClickRebalance}>Rebalance</DropdownItem> */}
                              </DropdownItemGroup>
                            </DropdownMenu>
                          </>
                    }
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
                  <Helmet>
                    <title>{bucketName}</title>
                    <meta name="description" content= "Check out this stock portfolio I made!"/>
                  </Helmet>
                  <div className="w-full sm:w-full md:w-full lg:w-2/5 justify-center mr-4">
                    {
                      !isFetchingBucketValue && bucketValue && user && user._id===bucketData.userId
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
                              {(((bucketValue-bucketCostBasis)/bucketCostBasis)).toFixed(0)}%
                            </span>
                          </div>
                    }
                    {
                      !isFetchingBucketHistoricalPrices && bucketHistoricalPrices && gData
                        &&
                          <StockChartNew
                            percentReturn={percentReturn}
                            calculatePercentReturn={calculatePercentReturn}
                            data={gData}
                          />
                    }
                   

                    {/* <div> <h4 className="text-2xl mt-12 font-bold text-gray-600 my-5">Yield: {bucketYield()}</h4></div>
                    <div> <h4 className="text-2xl mt-12 font-bold text-gray-600 my-5">Price to Earnings: {getPE()}</h4></div>
                    <div> <h4 className="text-2xl mt-12 font-bold text-gray-600 my-5">Management Expense: {getME()}</h4></div> */}
                    <div className = "flex-auto justify-items-center m-auto">
                      <div className = "m-auto" >
                        <table className="table-auto ">

                          <tbody>
                            <tr>
                              <td><span className="font-semibold text-l text-gray-600">Yield</span></td>
                              <td><span className="font-semibold text-l text-gray-500">{bucketYield()}</span></td>
                            </tr>
                            <tr className="bg-emerald-200">
                              <td><span className="font-semibold text-l text-gray-600">Price to Earnings</span></td>
                              <td><span className="font-semibold text-l text-gray-500">{getPE()}</span></td>

                            </tr>
                            <tr>
                              <td><span className="font-semibold text-l text-gray-600 mr-4">Management Expense</span></td>
                              <td><span className="font-semibold text-l text-gray-500">{getME()+"%"}</span></td>

                            </tr>
                          </tbody>
                        </table>
                      </div>

                      <div> <h4 className="text-l mt-12 font-semibold text-gray-500 my-5">Compared to the average ETF, you save {"$"+getMESavings()} in management fees every year with this bucket on a $10,000 investment 💰 😀 </h4></div>


                    </div>
                    <div className="block sm:block md:flex flex-auto">


                      {
                        bucketSectorWeights
                          &&
                            <PieChart
                              text="Sector Breakdown"
                              data={Object.entries(bucketSectorWeights).map(([key, value], i)=>({value, tooltip: key, color: colors[i]}))}
                              total={Object.values(bucketSectorWeights).reduce((total, value)=>(total+value), 0)}
                            />
                      }
                      {/* {
                        bucketSize
                          &&
                            <PyramidChart data={getDataForPyramidChart()} />
                      } */}

                      {
                        bucketBeta
                          &&
                            <GuageChart beta={bucketBeta} />
                      }

                    </div>
                  </div>
                </div>
              </>
        }
        <div className="flex-grow bg-white mt-12"><h1><Footer/></h1></div>

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
      <ChatWidget
          accountId="00add59e-ee51-4788-b40a-371df7820b23"
          title="Welcome to Buckets Investing"
          subtitle="What's the #1 thing we could do to improve Buckets for you? 😊"
          primaryColor="#7eb5a6"
          greeting=""
          awayMessage=""
          newMessagePlaceholder="Start typing..."
          showAgentAvailability={false}
          agentAvailableText="We're online right now!"
          agentUnavailableText="We're away at the moment."
          requireEmailUpfront={false}
          iconVariant="outlined"
          baseUrl="https://app.papercups.io"
          // Optionally include data about your customer here to identify them
          customer={{
            name: user?.firstName,
            email: user?.email,
            external_id: user?._id,
            metadata: {
              plan: "premium"
            }
          }}
        />
    </>
  );
}

export default Portfolio;
