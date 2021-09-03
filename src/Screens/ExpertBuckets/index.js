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
import { getExpertBuckets } from "../../Redux/Actions/bucket";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import MenuIcon from "../../Assets/Icons/menu.png";
import BucketsLogo from "../../Assets/buckets_logo.png";
import ForwardArrow from "../../Assets/Icons/forward.png";
import { showToast } from "../../Utils";
import Footer from "../../Components/Molecular/Footer"; 


const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const [metrics, setMetrics] = useState(null);
  const user = useSelector(state => state.auth.user);
  const buckets = useSelector(state => state.bucket.expertBuckets);
  const isFetchingBuckets = useSelector(state => state.bucket.isFetching);

  useEffect(()=>{
    if(!buckets.length) {
      dispatch(getExpertBuckets());
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
      setMetrics({
        currentValue,
        valueReturn: currentValue-costBasis,
        percentReturn: (currentValue-costBasis)/costBasis
      });
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
                    buckets.filter((bucket)=>bucket.type.toLowerCase()===props.location.state.type.toLowerCase()).map((bucket, index)=>(
                      <div key={index} onClick={()=>handleOnClickBucket(bucket)} className="flex mt-4 min-w-full items-center cursor-pointer justify-between">
                        <div className="flex items-center">
                          <img className="mx-2 rounded-full w-12 h-12 object-contain" src={bucket.userId===user._id?user.profilePicture:BucketsLogo} />
                          <div>
                            <span className="text-gray-500 text-xl font-bold">{bucket.name}</span>
                            {/* {
                              bucket.hasMetrics
                                &&
                                  <div>
                                    <span className="font-bold text-md text-gray-500">${bucket?.currentValue?.toFixed(2)}</span>
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
                            } */}
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
        <div className="flex-grow bg-white mt-24"><h1><Footer/></h1></div>
      </div>
      <ShareBucketPopup
        open={isShareModalVisible}
        onClose={()=>setShareModalVisibility(false)}
      />
    </>
  );
}

export default Portfolio;