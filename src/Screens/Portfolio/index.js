//https://nerdcave.com/tailwind-cheat-sheet
// curly braces since js object
//flex makes height of button and share icon same but span can help you get around this
//only tailwind selectors have to use : with
//useeffect- lifecycle - when component mounts- then it works- since we cannot call it, we cannot pass a paramaeter/arguments to it
//on press, render new row molecule, only select stock from dropdown, no value can be empty,
//array that stores stocks and values, on press => push new object, array.map when rendering
//if ... (spread operator), then you dont have to list out all key value pairs like {value: stocks[key].value, name: e.target.value}
//[Object.keys(stocks).length] - have to do it this way because the bucket is an object rather than an array where you could jsut do stocks.length
// 2. dropdown implementation, 3. price data pull for all stocks in bucket 4. metrics 5. saving to a database 6. sharing functionality
//1. %= value/sum of values
//if, for, else, const = , console.lo, useeffect - when an event happens - cant pass parameter,
//useEffect - stocks - value or anything update

//total percent  - guiding user to make sure weights add to 100 - only when weight adds up to exactly 100, then only we post to get-analytics
//dropdown - select - we have to make much quicker - our own implementation
//delete row functionality - for 2nd row onwards
//ticker + name - render from select
//yahoo finance prices and graph
//logo- clearbit logo

//usesTAte(initialize number with not string, component level variable, no use of variable outside function - state comes in
//gordon to add in assets table - whether stock is fractionable or not - minimum investment amount
//since stocks is a state- you have setState to update
//http://pages.stern.nyu.edu/~adamodar/New_Home_Page/datafile/pedata.html

import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import axios from "axios";
import Chart from "../../Components/Atomic/LineChart";
import Input from "../../Components/Atomic/Input";
import Button from "../../Components/Atomic/Button";
import Row from "../../Components/Molecular/Row";
import ShareIcon from "../../Assets/entypo_share.png";
import AddButton from "../../Components/Atomic/AddButton";
import stocksData from "../../Data/assets.json";
import { googleLogin } from "../../Redux/Actions/auth";
import { insertTokenInHeaders } from "../../Services";
import GoogleLoginPopup from "../../Components/Molecular/Popups/GoogleLogin";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import { encryptDataString } from '../../Utils';

const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const[bucketname, setbucetName] = useState("");
  const [totalPercent, setTotalPercent] = useState(0);
  const [showChart, setShowChart] = useState(false);
  const [stocks,setStocks]=useState({0: {name: "", logoUrl: "", percent: 0}});
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [isGoogleLoginModalVisible, setGooglLoginModalVisibility] = useState(false);
  const stockOptions = stocksData.map((stock)=>({label: `${stock.name} ${stock.symbol}`, logoUrl: stock.logo_url, value: stock}));

  useEffect(()=>{
    const sumOfPercents = Object.values(stocks).reduce((total, current)=>(total+current.percent), 0);
    if(sumOfPercents===100) {
      setShowChart(true);
      // const arrayOfStocks = Object.values(updatedStocks).map((stock)=>({name: stock.name, percent: stock.name}));
      // axios.post("http://localhost:3001/get-analytics", {stocks: arrayOfStocks}).then((response) => {
      //   console.log(response.data)
      // }).catch((err) => {console.log(err)})
    } else if(showChart) {
      setShowChart(false);
    }
  }, [stocks]);

  useEffect(()=>{
    setTotalPercent(Object.values(stocks).reduce((prev, current)=>(prev+parseFloat(current.percent)), 0))
  }, [stocks])

  const addRow = () => {
    setStocks({...stocks, [Object.keys(stocks).length]: { name: "", logoUrl: "", percent: 0}});
  }

  const onChangeStockName = (e, key) => {
    setStocks({...stocks, [key]: {...stocks[key], name: e.target.value}});
  }

  const onStockSelect = (stock, key) => {
    setStocks({...stocks, [key]: {...stocks[key], logoUrl: stock.logoUrl, name: stock.label}});
  }

  const onStockPercentIncrement = (key) => {
    if(stocks[key].percent < 100) {
      setStocks({...stocks, [key]: {...stocks[key], percent: stocks[key].percent+1}});
    }
  }

  const onStockPercentDecrement = (key) => {
    if(stocks[key].percent > 0) {
      setStocks({...stocks, [key]: {...stocks[key], percent: stocks[key].percent-1}});
    }
  }

  const deleteRow = (key) => {
    let tempStocks = {};
    Object.keys(stocks).forEach((rowNumber)=>{
      if(rowNumber!==key) {
        tempStocks[Object.keys(tempStocks).length] = stocks[rowNumber];
      }
    });
    setStocks(tempStocks);
  }

  const onGoogleLogin = (userInfo) => {
    const data = {
      email: userInfo.email,
      firstName: userInfo.givenName,
      lastName: userInfo.familyName,
      profilePicture: userInfo.imageUrl
    };
    dispatch(googleLogin(data, (authToken)=>{
      insertTokenInHeaders(authToken);
      const encryptedToken = encryptDataString(authToken);
      localStorage.setItem(
        "bucket_session",
        JSON.stringify(encryptedToken)
      );
    }));
  }

  return(
    <>
      <div className="p-11">
        <div className="flex justify-between">
          <h3 className="font-bold text-gray-400 text-4xl">Buckets</h3>
          <div className="flex items-center justify-between">
            <Button onClick={()=>setGooglLoginModalVisibility(true)} title="Save"/>
            <span onClick={()=>setShareModalVisibility(true)} className="cursor-pointer">
              <img src={ShareIcon} className="ml-4"/>
            </span>
          </div>
        </div>
        <div className="block sm:block md:flex justify-between mt-6">
          <div className="w-full sm:w-full md:w-full lg:w-2/5 ">
            <div className="flex items-center w-full">
              <Input className="w-3/5"
                value={bucketname}
                onChange={(e)=>setbucetName(e.target.vallue)}
                placeholder="Bucket Name"
              />
              <div className="flex w-2/5 justify-center">
                <div className={`${totalPercent < 100 ? 'text-gray-500' : totalPercent > 100 ? 'text-red-600' : 'text-green-600'}`}>Total: {totalPercent} %</div>
              </div>
            </div>
            {
              Object.keys(stocks).map((key)=>(
                <Row
                  rowIndex={key}
                  onChangeStockName={(e)=>onChangeStockName(e, key)}
                  onStockPercentIncrement={()=>onStockPercentIncrement(key)}
                  onStockPercentDecrement={()=>onStockPercentDecrement(key)}
                  suggestions={stockOptions.filter(item => item.label.toLowerCase().includes(stocks[key].name.toLowerCase()))}
                  onStockSelect={(stock)=>onStockSelect(stock, key)}
                  stockName={stocks[key].name}
                  logoUrl={stocks[key].logoUrl}
                  stockValue={stocks[key].value}
                  stockPercent={stocks[key].percent}
                  stockOptions={stockOptions}
                  deleteable={Object.keys(stocks).length>1 && key!==0}
                  deleteRow={deleteRow}
                />
              ))
            }
            <div>
              <AddButton title="+" className="mt-4" onClick={addRow}/>
            </div>
          </div>
          <div className="w-full sm:w-full md:w-full lg:w-2/5">
            {
              showChart
                &&
                  <Chart/>
            }
          </div>
        </div>
      </div>
      <GoogleLoginPopup
        open={isGoogleLoginModalVisible}
        onClose={()=>setGooglLoginModalVisibility(false)}
        onGoogleLogin={onGoogleLogin}
      />
      <ShareBucketPopup
        open={isShareModalVisible}
        onClose={()=>setShareModalVisibility(false)}
      />
    </>
  );
}

export default Portfolio;

//className, onChangeStock, onChangeValue, stockName, stockValue
//screen through html, what is a state on the page - declare the states either locally or through redux (server side response), actions, api endpoints
