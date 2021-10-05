import React, { useRef, useState, useEffect } from "react";
import { useDispatch } from "react-redux";
import useInterval from "react-useinterval";
import { render } from "react-dom";
import { Link } from "react-router-dom";
import Button from "../../Components/Atomic/Button";
import MenuIcon from "../../Assets/Icons/menu.png";
import { setNavMenuVisibility } from "../../Redux/Actions/app";
import RevenueBro1 from "../../Assets/backgrounds/Revenue-bro_1.png";
import ProgressGif from "../../Assets/gifs/Progress.gif";
import gif1 from "../../Assets/gifs/finalgif.gif";
// import YellowCliffLeft from "../../Assets/backgrounds/yellow_cliff_left.png";
import theme from "../../Theme";
import FeaturesBlocks from "../../Components/Molecular/FeatureBlocks";
import SlackFeedback, { themes } from "react-slack-feedback";
import { ChatWidget } from "@papercups-io/chat-widget";

// import Demo from "../../Components/Molecular/AutomateImages"
import Newsletter from "../../Components/Molecular/Newsletter";
import { Helmet } from "react-helmet";
import SmoothList from "react-smooth-list";
import Header from "../../Components/layout/Header";
import Footer from "../../Components/layout/Footer";
import FeaturesTiles from "../../Components/sections/FeaturesTiles";
import Image from "../../Components/elements/Image";
import Modal from "../../Components/elements/Modal";
// import Frame1 from "../../Assets/backgrounds/Frame1.png";
// import Frame2 from "../../Assets/backgrounds/Frame2.png";
// import Frame3 from "../../Assets/backgrounds/Frame3.png";
// import Frame4 from "../../Assets/backgrounds/Frame4.png";
// import Frame5 from "../../Assets/backgrounds/Frame5.png";
// import Frame6 from "../../Assets/backgrounds/Frame6.png";
// import Frame7 from "../../Assets/backgrounds/Frame7.png";
// import Frame8 from "../../Assets/backgrounds/Frame8.png";
// import Frame9 from "../../Assets/backgrounds/Frame9.png";
// import Frame10 from "../../Assets/backgrounds/Frame10.png";
// import Frame11 from "../../Assets/backgrounds/Frame11.png";
// import Frame12 from "../../Assets/backgrounds/Frame12.png";
// import Frame13 from "../../Assets/backgrounds/Frame13.png";
// import Frame14 from "../../Assets/backgrounds/Frame14.png";

// import { useSetState } from 'react-use';
// import { WaterfallSeries } from 'react-jsx-highcharts';

const Homepage = (props) => {
  // const slides = [Frame1, Frame2, Frame3, Frame4, Frame5, Frame6, Frame7, Frame8,Frame9, Frame10, Frame11, Frame12, Frame13, Frame14 ]
  // const [index, set] = useState(0)
  // const item = slides[index]
  // const increment = () => set(state => (state+1) % slides.length)
  // useInterval(increment, 200)

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
  };
  const [videoModalActive, setVideomodalactive] = useState(false);

  const openModal = (e) => {
    e.preventDefault();
    setVideomodalactive(true);
  };

  const closeModal = (e) => {
    e.preventDefault();
    setVideomodalactive(false);
  };
  return (
    <div className="landing">
      <Header isDemo={true} />
      <Modal
        id="video-modal"
        show={videoModalActive}
        handleClose={closeModal}
        video="https://www.youtube.com/embed/0s_AqIrQ51M"
        videoTag="iframe"
      />
      <div
        className="hero-figure reveal-from-bottom illustration-element-01 underHeader"
        data-reveal-value="20px"
        data-reveal-delay="800"
      >
        <div className="container-sm deckWrapper">
          <a
            data-video="https://www.youtube.com/embed/0s_AqIrQ51M"
            href="#0"
            aria-controls="video-modal"
            onClick={openModal}
          >
            <Image
              className="has-shadow"
              src={require("../../Assets/images/videoCover.PNG").default}
              alt="Hero"
              width={896}
              height={504}
            />
          </a>
        </div>
      </div>
      <FeaturesTiles className="about" />
      <Footer />
    </div>
  );
};

export default Homepage;

// <>
//   <div className="h-screen">
//     <Helmet>
//       <title>Buckets Investing</title>
//       <meta
//         name="description"
//         content="Build a smart portfolio in minutes with no management fees. Customers can create smart investment baskets on Buckets in minutes to automate investing (the wrapper function for your brokerage). A bucket is a basket of exchange traded securities, similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors.Investing is all about risk. There is no way around this fact. The more risk you take, the higher the returns. A bucket is a basket of exchange traded securities similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors. Bucket is a casual term that portfolio managers and investors frequently use to allude to a cluster of assets. Customers can browse and buy pre-made portfolios created by other users or “experts”. Our purpose is to provide a more effective alternative to traditional investment funds such as ETFs and mutual funds and become the creator economy for stock and cryptocurrency portfolios. Using a bucket strategy can help you control your emotions and prevent you from selling investments out of fear. "
//       />
//     </Helmet>
//     <div className="z-40 flex px-11 py-6 w-full justify-between fixed bg-white">
//       <h3 className="text-5xl text-gray-700 font-bold">Buckets</h3>
//       <div className="flex items-center justify-between">
//         <img
//           onClick={handleOnNavMenuClick}
//           className="w-6 h-6 mx-4 cursor-pointer object-contain"
//           src={MenuIcon}
//         />
//       </div>
//     </div>
//     <SmoothList>
//       <div
//         // style={{backgroundImage: `url(${YellowCliffLeft})`, backgroundRepeat: "no-repeat", backgroundPosition: "left bottom", backgroundSize: '30% 30%'}}
//         className="flex flex-col-reverse sm:flex-col-reverse md:flex-row justify-between h-screen bg-acapulco-500 "
//       >
//         <div className="w-full sm:w-full md:w-full lg:w-2/5 h-full flex items-center justify-center">
//           <div className="my-auto w-full sm:w-full md:w-4/5">
//             <h1 className="sm: text-3xl text-gray-700 font-bold m-5 md:text-5xl text-gray-200 font-bold m-5  ">
//               Invest in ideas
//             </h1>
//             <p className="sm: text-xl text-gray-600 m-5 md: text-2xl text-gray-600 m-5">
//               Completely customizable baskets no management fees. Invest
//               like the pros today!{" "}
//             </p>
//             <Link to="/home">
//               <Button
//                 title="Explore"
//                 styles={{
//                   backgroundColor: "#d59574",
//                   borderColor: "#d59574",
//                   boxShadow: theme.shadows.black,
//                   textColor: theme.colors.black,
//                 }}
//                 className="ml-6"
//               />
//             </Link>
//           </div>
//         </div>

//         <div
//           style={{
//             backgroundImage: `url(${gif1})`,
//             backgroundPosition: "center",
//             height: "100%",
//             backgroundRepeat: "no-repeat",
//             backgroundSize: "contain",
//           }}
//           className="w-full sm:w-full mt-3 mb-3 md:w-full lg:w-3/6 flex items-end"
//         ></div>
//       </div>
//     </SmoothList>

//     <div className="flex-grow bg-white">
//       <h1>
// <FeaturesBlocks />
//       </h1>
//     </div>
//     <div className="flex-grow bg-white aspect-w-16 aspect-h-9">
//       <iframe
//         src="https://www.youtube.com/embed/0s_AqIrQ51M"
//         frameborder="0"
//         allow="autoplay; encrypted-media"
//         allowfullscreen
//         title="video"
//       />
//     </div>
//     {/* <div className="flex px-11 py-6 w-full justify-between">
//       <h3 className="text-3xl text-gray-700 font-bold">Buckets Investing</h3>
//       <h3 className="text-2xl text-gray-700 font-bold mx-4  "> Contact: info@bucketsinvesting.com</h3>

//     </div> */}
//     <ChatWidget
//       accountId="00add59e-ee51-4788-b40a-371df7820b23"
//       title="Welcome to Buckets Investing"
//       subtitle="What's the #1 thing we could do to improve Buckets for you? 😊"
//       primaryColor="#7eb5a6"
//       greeting=""
//       awayMessage=""
//       newMessagePlaceholder="Start typing..."
//       showAgentAvailability={false}
//       agentAvailableText="We're online right now!"
//       agentUnavailableText="We're away at the moment."
//       requireEmailUpfront={false}
//       iconVariant="outlined"
//       baseUrl="https://app.papercups.io"
//       // Optionally include data about your customer here to identify them
//       // customer={{
//       //   name: __CUSTOMER__.name,
//       //   email: __CUSTOMER__.email,
//       //   external_id: __CUSTOMER__.id,
//       //   metadata: {
//       //     plan: "premium"
//       //   }
//       // }}
//     />

//     <div className="flex-grow bg-white mt-12">
//       <h1>
//         <Footer />
//       </h1>
//     </div>

//     {/* <div className="flex-grow bg-gray-300"><Demo/></div> */}
//     {/* <div className="flex-grow justify-center items-center bg-bred-500 "><h1><Newsletter/></h1></div> bg-acapulco-500 */}
//   </div>
// </>
