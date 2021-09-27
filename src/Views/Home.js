import React, { useState } from "react";
// import sections
import Hero from "../Components/sections/Hero";
import FeaturesTiles from "../Components/sections/FeaturesTiles";
import FeaturesSplit from "../Components/sections/FeaturesSplit";
import Testimonial from "../Components/sections/Testimonial";
import Cta from "../Components/sections/Cta";
import Footer from "../Components/layout/Footer";
import Deck from "../Deck";
import { Helmet } from "react-helmet";
import "../Assets/scss/style.scss";
import WaitingList from "./WaitingList";
const Home = () => {
  const [showWaitingList, setShowWaitingList] = useState(false);

  const openWaitingList = () => {
    setShowWaitingList((prev) => !prev);
  };

  return (
    <div className="landing">
      <Hero className="illustration-section-01" />
      <FeaturesTiles />
      <FeaturesSplit
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
      />
      <Testimonial topDivider />
      <Cta split />
      {/* <WaitingList
        showList={showWaitingList}
        setShowWaitingList={setShowWaitingList}
      /> */}
      <Footer addToList={setShowWaitingList} />
    </div>
  );
};

export default Home;
