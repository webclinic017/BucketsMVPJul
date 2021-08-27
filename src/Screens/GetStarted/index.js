import React, {
  useRef,
  useState,
  useEffect
} from 'react';
import { useDispatch } from 'react-redux';
import useInterval from 'react-useinterval'
import {render} from 'react-dom'
import { Link } from 'react-router-dom';
import Button from "../../Components/Atomic/Button";
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import RevenueBro1 from "../../Assets/backgrounds/Revenue-bro_1.png";
// import YellowCliffLeft from "../../Assets/backgrounds/yellow_cliff_left.png";
import theme from '../../Theme';
import FeaturesBlocks from "../../Components/Molecular/FeatureBlocks"; 
// import Demo from "../../Components/Molecular/AutomateImages"
import Newsletter from "../../Components/Molecular/Newsletter"; 
import { Helmet } from 'react-helmet';
import Frame1 from "../../Assets/backgrounds/Frame1.png";
import Frame2 from "../../Assets/backgrounds/Frame2.png";
import Frame3 from "../../Assets/backgrounds/Frame3.png";
import Frame4 from "../../Assets/backgrounds/Frame4.png";
import Frame5 from "../../Assets/backgrounds/Frame5.png";
import Frame6 from "../../Assets/backgrounds/Frame6.png";
import Frame7 from "../../Assets/backgrounds/Frame7.png";
import Frame8 from "../../Assets/backgrounds/Frame8.png";
import Frame9 from "../../Assets/backgrounds/Frame9.png";
import Frame10 from "../../Assets/backgrounds/Frame10.png";
import Frame11 from "../../Assets/backgrounds/Frame11.png";
import Frame12 from "../../Assets/backgrounds/Frame12.png";
import Frame13 from "../../Assets/backgrounds/Frame13.png";
import Frame14 from "../../Assets/backgrounds/Frame14.png";

// import { useSetState } from 'react-use';
// import { WaterfallSeries } from 'react-jsx-highcharts';


const Homepage = (props)=> {
  const slides = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6, Frame7, Frame8,Frame9, Frame10, Frame11, Frame12, Frame13, Frame14 ]
  const [index, set] = useState(0)
  const item = slides[index]
  const increment = () => set(state => (state+1) % slides.length)
  useInterval(increment, 200)



  // const [progressImage, setProgressImage] = useState("Frame1");
  // const frames = ["Frame1","Frame2", "Frame3", "Frame4", "Frame5", "Frame6"]
  // useEffect(()=>{
    
  //     frames.forEach((name) => {
  //         setProgressImage(name);
  //         console.log(progressImage);
  //       }
  //     )

    
  //   console.log(progressImage)
  // },[]);
 
    

  
  
  const dispatch = useDispatch();

  const handleOnNavMenuClick = () => {
    dispatch(setNavMenuVisibility(true));
  }



  return(
    <>
      <div className="h-screen">
      <Helmet>
          <title>Buckets Investing</title>
          <meta name="description" content= "Build a smart portfolio in minutes with no management fees. Customers can create smart investment baskets on Buckets in minutes to automate investing (the wrapper function for your brokerage). A bucket is a basket of exchange traded securities, similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors.Investing is all about risk. There is no way around this fact. The more risk you take, the higher the returns. A bucket is a basket of exchange traded securities similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors. Bucket is a casual term that portfolio managers and investors frequently use to allude to a cluster of assets. Customers can browse and buy pre-made portfolios created by other users or “experts”. Our purpose is to provide a more effective alternative to traditional investment funds such as ETFs and mutual funds and become the creator economy for stock and cryptocurrency portfolios. Using a bucket strategy can help you control your emotions and prevent you from selling investments out of fear. "/>
      </Helmet>
        <div className="flex px-11 py-6 w-full justify-between fixed">
          <h3 className="text-5xl text-gray-700 font-bold">Buckets</h3>
          <div className="flex items-center justify-between">
            <img onClick={handleOnNavMenuClick} className="w-6 h-6 mx-4 cursor-pointer object-contain" src={MenuIcon} />
          </div>
        </div>
        <div
          // style={{backgroundImage: `url(${YellowCliffLeft})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
          className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen bg-acapulco-400 "
        >
          <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
            <div className="my-auto w-full sm:w-full md:w-4/5">
              <h1 className="sm: text-3xl text-gray-700 font-bold m-5 md:text-5xl text-gray-700 font-bold m-5  ">The Best Alternative to ETFs and Mutual Funds</h1>
              <p className="sm: text-xl text-gray-600 m-5 md: text-3xl text-gray-600 m-5">Completely customizable with no management fees. Invest like the pros today! </p>
              <Link to="/home" >
                <Button
                  title="Explore"
                  styles={{
                    backgroundColor: "#C36839",
                    borderColor: "#C36839",
                    boxShadow: theme.shadows.black,
                    textColor: theme.colors.black
                    
                  }}
                  className="ml-6"
                />
              </Link>
            </div>
          </div>
          
          <div style={{backgroundImage: `url(${item})`, backgroundPosition: "center", height: '100%', backgroundRepeat: "no-repeat", backgroundSize: 'contain'}} className="w-full sm:w-full mt-3 mb-3 md:w-full lg:w-3/6 flex items-end">
          </div>
          </div>
          
        
        <div className="flex-grow bg-gray-300"><h1><FeaturesBlocks/></h1></div>
        {/* <div className="flex-grow bg-gray-300"><Demo/></div> */}
        {/* <div className="flex-grow justify-center items-center bg-bred-500 "><h1><Newsletter/></h1></div> */}
      </div>
    </>
  );
}

export default Homepage;
