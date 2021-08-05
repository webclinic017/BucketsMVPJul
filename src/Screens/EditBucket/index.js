import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router-dom';
import MoonLoader from 'react-spinners/MoonLoader';
import Input from "../../Components/Atomic/Input";
import Button from "../../Components/Atomic/Button";
import EditableStockRow from "../../Components/Molecular/EditableStockRow";
import AddButton from "../../Components/Atomic/AddButton";
import stocksData from "../../Data/assets.json";
import { googleLogin } from "../../Redux/Actions/auth";
import { getBucketData, updateBucket } from "../../Redux/Actions/bucket";
import { insertTokenInHeaders } from "../../Services";
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import GoogleLoginPopup from "../../Components/Molecular/Popups/GoogleLogin";
import { encryptDataString, showToast } from "../../Utils";
import theme from "../../Theme";

const EditBucket = (props)=> {
  const dispatch = useDispatch();
  const { id: bucketId } = useParams();
  const [bucketName, setBucketName] = useState("");
  const [totalPercentage, setTotalPercentage] = useState(0);
  const [stocks,setStocks] = useState({0: {name: "", logoUrl: "", percentage: 0}});
  const [isGoogleLoginModalVisible, setGooglLoginModalVisibility] = useState(false);
  const stockOptions = stocksData.map((stock)=>({label: `${stock.name} ${stock.symbol}`, logoUrl: stock.logo_url, name: stock.name, ticker: stock.symbol}));
  const user = useSelector(state => state.auth.user);
  const isFetchingBucket = useSelector(state => state.bucket.isFetchingBucketData);
  const bucketData = useSelector(state => state.bucket.bucketData);
  const isSavingBucket = useSelector(state => state.bucket.isPosting);

  useEffect(()=>{
    dispatch(getBucketData({bucketId}));
  }, []);

  useEffect(() => {
    if(Object.keys(bucketData) && !isFetchingBucket) {
      setBucketName(bucketData.name);
      let newStocks = {};
      bucketData?.stocks?.forEach((stock)=>{
        newStocks[Object.keys(newStocks).length] = stock;
      });
      setStocks(newStocks);
    }
  }, [bucketData]);

  useEffect(()=>{
    setTotalPercentage(Object.values(stocks).reduce((total, current)=>(total+parseFloat(current.targetWeight)), 0));
  }, [stocks]);

  const addRow = () => {
    setStocks({...stocks, [Object.keys(stocks).length]: { name: "", logoUrl: "", targetWeight: 0, percentWeight: 0}});
  }

  const onChangeStockName = (e, key) => {
    setStocks({...stocks, [key]: {...stocks[key], name: e.target.value}});
  }

  const onStockSelect = (stock, key) => {
    setStocks({...stocks, [key]: {...stocks[key], logoUrl: stock.logoUrl, name: stock.name, ticker: stock.ticker}});
  }

  const onStockPercentIncrement = (key) => {
    if(stocks[key].targetWeight < 100) {
      setStocks({...stocks, [key]: {...stocks[key], targetWeight: stocks[key].targetWeight+1}});
    }
  }

  const onStockPercentDecrement = (key) => {
    if(stocks[key].targetWeight > 0) {
      setStocks({...stocks, [key]: {...stocks[key], targetWeight: stocks[key].targetWeight-1}});
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

  const saveBucket = () => {
    if(!bucketName.length) {
      showToast("Please enter bucket name!", "warning");
    } else if(Object.values(stocks).filter((stock)=>(!stock.name.length || stock.targetWeight === 0)).length) {
      showToast(`Please fill out all stock rows properly!`, "warning");
    } else if(totalPercentage!==100) {
      showToast(`Total percentage should add up to 100 not ${totalPercentage}!`, "warning");
    } else {
      const data = {
        bucketId: bucketData.id,
        bucketName,
        stocks: Object.values(stocks)
      };
      dispatch(updateBucket(data));
    }
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
        encryptedToken
      );
      saveBucket();
    }));
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
                      title="Save"
                      className="mr-5"
                      isProcessing={isSavingBucket}
                      onClick={user ? saveBucket : ()=>setGooglLoginModalVisibility(true)}
                    />
                    <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
                  </div>
                </div>
                <div className="block sm:block md:flex justify-between mt-6">
                  <div className="w-full sm:w-full md:w-full lg:w-2/5 ">
                    <div className="flex items-center w-full">
                      <Input className="w-3/5 text-gray-600"
                        value={bucketName}
                        onChange={(e)=>setBucketName(e.target.value)}
                        placeholder="Bucket Name"
                      />
                      <div className="flex w-2/5 justify-center">
                        <div className={`${totalPercentage < 100 ? 'text-gray-500' : totalPercentage > 100 ? 'text-red-600' : 'text-green-600'}`}>Total: {totalPercentage} %</div>
                      </div>
                    </div>
                    {
                      Object.keys(stocks).map((key)=>(
                        <EditableStockRow
                          rowIndex={key}
                          onChangeStockName={(e)=>onChangeStockName(e, key)}
                          onStockPercentIncrement={()=>onStockPercentIncrement(key)}
                          onStockPercentDecrement={()=>onStockPercentDecrement(key)}
                          suggestions={stockOptions.filter(item => item.label.toLowerCase().includes(stocks[key].name.toLowerCase()))}
                          onStockSelect={(stock)=>onStockSelect(stock, key)}
                          stockName={stocks[key].name}
                          logoUrl={stocks[key].logoUrl}
                          stockValue={stocks[key].value}
                          stockPercent={stocks[key].targetWeight}
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

                  </div>
                </div>
              </>
        }
      </div>
      <GoogleLoginPopup
        open={isGoogleLoginModalVisible}
        onClose={()=>setGooglLoginModalVisibility(false)}
        onGoogleLogin={onGoogleLogin}
      />
    </>
  );
}

export default EditBucket;
