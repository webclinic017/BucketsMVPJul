import React, { useState } from "react";
// import sections
import axios from "axios";
import Hero from "../Components/sections/Hero";
import FeaturesTiles from "../Components/sections/FeaturesTiles";
import FeaturesSplit from "../Components/sections/FeaturesSplit";
import Testimonial from "../Components/sections/Testimonial";
import Cta from "../Components/sections/Cta";
import Footer from "../Components/layout/Footer";
import Deck from "../Deck";
import { Helmet } from "react-helmet";
import "../Assets/scss/style.scss";
import "../Assets/styles/popupStyles.css";
import WaitingList from "./WaitingList";
const Home = () => {
  const [showAdd, setShowAdd] = useState(false);
  const [refferal, setRefferal] = useState("");
  const toggleWaitingList = () => {
    setShowAdd((prev) => !prev);
  };
  const openWaitingList = () => {
    const body = {
      name: "",
      email: document.getElementById("newsletter").value,
    };
    console.log(body);
    axios
      .post(
        "https://buckets-rahul-server.herokuapp.com/referral/add-user",
        body
      )
      .then((response) => {
        setRefferal(response.data);
        setShowAdd((prev) => !prev);
      })
      .catch((error) => {
        console.log(error);
      });
  };

  return (
    <div className="landing">
      <WaitingList
        showList={showAdd}
        setShowWaitingList={setShowAdd}
        closeModal={toggleWaitingList}
        refferal={refferal}
      />

      <Hero className="illustration-section-01" />
      {/* <FeaturesTiles /> */}
      <FeaturesSplit
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
      />
      <Testimonial topDivider />
      <Cta split addToList={openWaitingList} />
      <Footer />
    </div>
  );
};

export default Home;
