import React, { useState, useEffect } from "react";
// import sections
import axios from "axios";
import Hero from "../Components/sections/Hero";
import FeaturesTiles from "../Components/sections/FeaturesTiles";
import FeaturesSplit from "../Components/sections/FeaturesSplit";
import Testimonial from "../Components/sections/Testimonial";
import Story from "../Components/sections/Story";
import Cta from "../Components/sections/Cta";
import Image from "../Components/elements/Image";
import Footer from "../Components/layout/Footer";
import Competition from "../Components/sections/Competition";
import Header from "../Components/layout/Header";
import "../Assets/scss/style.scss";
import "../Assets/styles/popupStyles.css";
import WaitingList from "./WaitingList";
import Aos from "aos";
import "aos/dist/aos.css";
import APIClient from "../Utils/Service";
const Home = () => {
  const [Insights, setInsights] = useState([]);
  useEffect(() => {
    Aos.init({ duration: 1000 });

    APIClient.get("bucket/get-home-insights").then((response) => {
      if (response.status === 200 && response.data.success) {
        setInsights(response.data.insights);
      }
    });
  });
  const [showAdd, setShowAdd] = useState(false);
  const [refferal, setRefferal] = useState("");
  const toggleWaitingList = () => {
    setShowAdd((prev) => !prev);
  };
  const openWaitingList = () => {
    var url = new URL(window.location.href);
    var code = url.searchParams.get("code");
    var waitingListInput = document.getElementById("newsletter");
    var requesturl = code ? "/referral/add-user/" + code : "/referral/add-user";
    const body = {
      name: "",
      email: waitingListInput.value,
    };
    if (body.email != "") {
      waitingListInput.classList.remove("invalidmail");
      waitingListInput.placeholder = "Your best email";

      APIClient.post(requesturl, body)
        .then((response) => {
          setRefferal(response.data);
          setShowAdd((prev) => !prev);
        })
        .catch((error) => {
          console.log(error);
        });
    } else {
      console.log("empty email");
      waitingListInput.classList.add("invalidmail");
      waitingListInput.placeholder = "Enter a valid email.";
    }
  };

  return (
    <div className="landing">
      <Header />
      <WaitingList
        showList={showAdd}
        setShowWaitingList={setShowAdd}
        closeModal={toggleWaitingList}
        refferal={refferal}
      />

      <Hero className="illustration-section-01" />
      {/* <FeaturesTiles /> */}
      <div className="container-l home-banner">
        <Image
          src={require("../Assets/images/1.jpg").default}
          className="home-bannerImg"
          data-aos="fade-up"
        />
        <Image
          src={require("../Assets/images/2.jpg").default}
          className="home-bannerImg"
          data-aos="fade-up"
        />
        <Image
          src={require("../Assets/images/3.jpg").default}
          className="home-bannerImg"
          data-aos="fade-up"
        />
        <Image
          src={require("../Assets/images/4.jpg").default}
          className="home-bannerImg"
          data-aos="fade-up"
        />
        <Image
          src={require("../Assets/images/5.jpg").default}
          className="home-bannerImg"
          data-aos="fade-up"
        />
      </div>
      <div
        className="container-l home-banner"
        style={{
          justifyContent: "center",
          alignItems: "center",
          paddingTop: 80,
        }}
      >
        <div className="downloadBtn">
          <a
            href="https://testflight.apple.com/join/qsc0mMGU"
            className="downloadTextWrapper"
          >
            <label className="downloadText">Get it for iPhone</label>
          </a>
        </div>

        <div className="downloadBtn">
          <a
            href="https://www.bucketsinvesting.com/files/buckets_investing.apk"
            className="downloadTextWrapper"
          >
            <label className="downloadText">Get it for Android</label>
          </a>
        </div>
      </div>
      <Competition />
      {/* <FeaturesSplit
        invertMobile
        topDivider
        imageFill
        className="illustration-section-02"
      /> */}

      <Testimonial topDivider />

      <div className="brokerageHeader" data-aos="fade-up">
        <h2 className="mt-0 mb-0" id="newsletterSection">
          Coming soon to these platforms
        </h2>
      </div>
      <div className="brokerageContainer" data-aos="fade-up">
        <div className="brokerage">
          <a
            id="brokerage-fidelity"
            target="_blank"
            className="brokerageImage"
            href="https://www.fidelity.ca/"
          ></a>
          <a
            id="brokerage-coinbase"
            target="_blank"
            className="brokerageImage"
            href="https://www.coinbase.com/"
          ></a>
          <a
            id="brokerage-robinhood"
            target="_blank"
            className="brokerageImage"
            href="https://robinhood.com"
          ></a>
          <a
            id="brokerage-alpaca"
            target="_blank"
            className="brokerageImage"
            href="https://alpaca.markets/"
          ></a>
          <a
            id="brokerage-cs"
            target="_blank"
            className="brokerageImage"
            href="https://www.schwab.com/"
          ></a>
          <a
            id="brokerage-wealthsimple"
            target="_blank"
            className="brokerageImage"
            href="https://www.wealthsimple.com"
          ></a>
          <a
            id="brokerage-td"
            target="_blank"
            className="brokerageImage"
            href="https://www.tdameritrade.com/"
          ></a>
        </div>
      </div>

      <Cta split addToList={openWaitingList} />
      {Insights.length > 0 && <Story topDivider data={Insights} />}

      <Footer />
    </div>
  );
};

export default Home;
