import React, {
  useState,
  useEffect
} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import Chart from "../../Components/Atomic/LineChart";
import ProgressBar from "../../Components/Atomic/ProgressBar";
import theme from "../../Theme";
import ShareIcon from "../../Assets/entypo_share.png";
import ShareBucketPopup from "../../Components/Molecular/Popups/ShareBucket";
import { getUserBuckets } from "../../Redux/Actions/bucket";
import MoonLoader from "react-spinners/MoonLoader";
import BucketsLogo from "../../Assets/buckets_logo.png";
import ForwardArrow from "../../Assets/Icons/forward.png";
import { showToast } from '../../Utils';

const Portfolio = (props)=> {
  const dispatch = useDispatch();
  const [isShareModalVisible, setShareModalVisibility] = useState(false);
  const user = useSelector(state => state.auth.user);
  const buckets = useSelector(state => state.bucket.buckets);
  const isFetchingBuckets = useSelector(state => state.bucket.isFetching);

  useEffect(()=>{
    dispatch(getUserBuckets());
  }, []);

  const handleOnClickBucket = (bucket) => {
    props.history.push(`/bucket/${bucket._id}`);
  }

  return(
    <>
      <div className="p-11 flex flex-col min-h-screen">
        <div className="flex justify-between">
          <div className="flex items-center">
            <img className="w-16 h-16 object-contain rounded-full mr-3" src={user?.profilePicture} />
            <div>
              <h3 className="font-bold text-gray-400 text-4xl">{user?.firstName} {user?.lastName}</h3>
              <div>
                <span className="font-bold" style={{color: theme.colors.lightPurple}}>$7.1M </span>
                Follower Assets  |
                <span className="font-bold"> 11 </span> 
                Following |
                <span className="font-bold"> 164</span> Followers
              </div>
            </div>
          </div>
          {
            !isFetchingBuckets
              &&
                <div className="flex items-center justify-between">
                  <div>
                    <span className="font-bold text-lg text-gray-500">$24,433.84</span>
                    <span className="text-xl text-gray-400"> | </span>
                    <span style={{color: theme.colors.green}} className="font-bold text-lg">+4,756.21</span>
                    <span className="text-xl text-gray-400"> | </span>
                    <span style={{color: theme.colors.green}} className="font-bold text-lg">+7.89%</span>
                  </div>
                  <span onClick={()=>setShareModalVisibility(true)} className="cursor-pointer">
                    <img src={ShareIcon} className="ml-4"/>
                  </span>
                </div>
          }
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
                          <img className="mx-2 w-16 h-16 object-contain" src={BucketsLogo} />
                          <div>
                            <span className="text-gray-500 text-xl font-bold">{bucket.name}</span>
                            <div>
                              <span className="font-bold text-md text-gray-500">$24,433.84</span>
                              <span className="text-lg text-gray-400"> | </span>
                              <span style={{color: theme.colors.green}} className="font-bold text-md">+4,756.21</span>
                              <span className="text-lg text-gray-400"> | </span>
                              <span style={{color: theme.colors.green}} className="font-bold text-md">+7.89%</span>
                            </div>
                          </div>
                        </div>
                        <img className="mx-6 w-4 h-4 object-contain" src={ForwardArrow} />
                      </div>
                    ))
                  }
                </div>
                <div className="w-full sm:w-full md:w-full lg:w-2/5">
                  <Chart/>
                  <ProgressBar color={theme.colors.lightPurple} month="January" value={613} progress={0.6} />
                  <ProgressBar color={theme.colors.red} month="February" value={613} progress={0.8} />
                  <ProgressBar color={theme.colors.orange} month="March" value={613} progress={0.7} />
                </div>
              </div>
        }
      </div>
      <ShareBucketPopup
        open={isShareModalVisible}
        onClose={()=>setShareModalVisibility(false)}
      />
    </>
  );
}

export default Portfolio;