import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import MoonLoader from "react-spinners/MoonLoader";
import Chart from "../../Components/Atomic/LineChart";
import ProgressBar from "../../Components/Atomic/ProgressBar";
import theme from "../../Theme";
import ShareIcon from "../../Assets/entypo_share.png";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import { getUserBuckets } from "../../Redux/Actions/bucket";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import MenuIcon from "../../Assets/Icons/menu.png";
import BucketsLogo from "../../Assets/buckets_logo.png";
import ForwardArrow from "../../Assets/Icons/forward.png";
import { showToast } from "../../Utils";
import { Link } from 'react-router-dom';
import Footer from "../../Components/Molecular/Footer"; 



const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const user = useSelector(state => state.auth.user);
  const buckets = useSelector(state => state.bucket.buckets);
  const isFetchingBuckets = useSelector(state => state.bucket.isFetching);

  useEffect(()=>{
    if(!buckets.length) {
      dispatch(getUserBuckets());
    }
  }, []);

  useEffect(()=>{
    if(buckets.length) {
      let currentValue=0, costBasis=0;
      for(const bucket of buckets) {
        if(bucket.hasMetrics) {
          currentValue += bucket.currentValue;
          costBasis += bucket.costBasis;
        }
      }
      if(currentValue>0 && costBasis>0) {
        setMetrics({
          currentValue,
          valueReturn: currentValue-costBasis,
          percentReturn: (currentValue-costBasis)/costBasis
        });
      }
    }
  }, [buckets]);

  const handleOnClickBucket = (bucket) => {
    props.history.push(`/bucket/${bucket._id}`);
  }

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }

  return(
    <>
      <div className="p-11 flex flex-col min-h-screen">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img className="w-16 h-16 object-contain rounded-full mr-3" src={user?.profilePicture} />
            <div>
              <h3 className="font-bold text-gray-400 text-4xl">{user?.firstName} {user?.lastName}</h3>
              {/* <div>
                <span className="font-bold" style={{color: theme.colors.lightPurple}}>$7.1M </span>
                Follower Assets  |
                <span className="font-bold"> 11 </span> 
                Following |
                <span className="font-bold"> 164</span> Followers
              </div> */}
            </div>
          </div>
          <div div className="flex items-center justify-between">
            {
              !isFetchingBuckets && metrics
                &&
                  <>
                    <div>
                      <span className="font-bold text-md text-gray-500">${metrics.currentValue.toFixed(2)}</span>
                      <span className="text-lg text-gray-400 mx-1">|</span>
                      <span
                        style={{color: metrics.valueReturn>0 ? theme.colors.green : theme.colors.red}}
                        className="font-bold text-md"
                      >
                        {metrics.valueReturn>0 && "+"}{metrics.valueReturn.toFixed(2)}
                      </span>
                      <span className="text-lg text-gray-400 mx-1">|</span>
                      <span
                        style={{color: metrics.percentReturn>0 ? theme.colors.green : theme.colors.red}}
                        className="font-bold text-md"
                      >
                        {metrics.percentReturn>0 && "+"}{metrics.percentReturn.toFixed(2)}%
                      </span>
                    </div>
                    <span onClick={()=>setShareModalVisibility(true)} className="cursor-pointer">
                      <img src={ShareIcon} className="ml-4"/>
                    </span>
                  </>
            }
            <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
          </div>
        </div>
        {
          isFetchingBuckets
            ?
              <div className="flex my-auto max-w-screen justify-center items-center">
                <MoonLoader size={40} color={theme.colors.green} loading={true} />
              </div>
            :
              <div className="block sm:block md:flex justify-between mt-6">
                <div className="w-full sm:w-full md:w-full lg:w-2/5">
                  {
                    buckets.map((bucket, index)=>(
                      <div key={index} onClick={()=>handleOnClickBucket(bucket)} className="flex mt-4 min-w-full items-center cursor-pointer justify-between">
                        <div className="flex items-center">
                          <img className="mx-2 rounded-full w-12 h-12 object-contain" src={bucket.userId===user._id?user.profilePicture:BucketsLogo} />
                          <div>
                            <span className="text-gray-500 text-xl font-bold">{bucket.name}</span>
                            {
                              bucket.hasMetrics
                                &&
                                  <div>
                                    <span className="font-bold text-md text-gray-500">${bucket.currentValue.toFixed(2)}</span>
                                    <span className="text-lg text-gray-400 mx-1">|</span>
                                    <span
                                      style={{color: bucket.valueReturn>0 ? theme.colors.green : theme.colors.red}}
                                      className="font-bold text-md"
                                    >
                                      {bucket.valueReturn>0 && "+"}{bucket.valueReturn.toFixed(2)}
                                    </span>
                                    <span className="text-lg text-gray-400 mx-1">|</span>
                                    <span
                                      style={{color: bucket.percentReturn>0 ? theme.colors.green : theme.colors.red}}
                                      className="font-bold text-md"
                                    >
                                      {bucket.percentReturn>0 && "+"}{bucket.percentReturn.toFixed(2)}%
                                    </span>
                                  </div>
                            }
                          </div>
                        </div>
                        <img className="mx-6 w-4 h-4 object-contain" src={ForwardArrow} />
                      </div>
                    ))
                  }
                </div>
                <div className="w-full sm:w-full md:w-full lg:w-2/5">
                  {/* <Chart/>
                  <ProgressBar color={theme.colors.lightPurple} month="January" value={613} progress={0.6} />
                  <ProgressBar color={theme.colors.red} month="February" value={613} progress={0.8} />
                  <ProgressBar color={theme.colors.orange} month="March" value={613} progress={0.7} /> */}
                </div>
              </div>
        }
      {/* 1st item */}
      <div className="relative max-w-6xl mx-auto px-4 sm:px-6 ">
        <div className="py-12 md:py-20 flex"> 
          <div className="max-w-sm mx-auto grid gap-6 md:grid-cols-2 lg:grid-cols-3 items-start md:max-w-2xl lg:max-w-none"></div>
            <Link to="/home">
              <div className="m-4 relative flex flex-col items-center p-6 bg-tuscany-400 rounded shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z" />
                </svg>        
                <h4 className="text-xl  font-bold leading-snug tracking-tight mb-1">Browse Pre-Made Buckets</h4>
                <p className="text-gray-700 text-center">The one stop shop for diversification and new ideas</p>
              </div>
            </Link>

            {/* 2nd item */}
            <Link to="/create-bucket">
              <div className="m-4 relative flex flex-col items-center p-6 bg-tuscany-400 rounded shadow-xl">
                <svg xmlns="http://www.w3.org/2000/svg" className="h-12 w-12" fill="none" viewBox="0 0 24 24" stroke="currentColor">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19.428 15.428a2 2 0 00-1.022-.547l-2.387-.477a6 6 0 00-3.86.517l-.318.158a6 6 0 01-3.86.517L6.05 15.21a2 2 0 00-1.806.547M8 4h8l-1 1v5.172a2 2 0 00.586 1.414l5 5c1.26 1.26.367 3.414-1.415 3.414H4.828c-1.782 0-2.674-2.154-1.414-3.414l5-5A2 2 0 009 10.172V5L8 4z" />
                </svg>
                <h4 className="text-xl  font-bold leading-snug tracking-tight mb-1">Create Bucket</h4>
                <p className="text-gray-700 text-center">Its as simple as creating a playlist of songs or a to-do list</p>
              </div>
            </Link>
          </div>
          </div>
          <div className="flex-grow bg-white mt-12"><h1><Footer/></h1></div>

        </div>

      <ShareBucketPopup
        open={isShareModalVisible}
        onClose={()=>setShareModalVisibility(false)}
      />
    </>
  );
}

export default Portfolio;