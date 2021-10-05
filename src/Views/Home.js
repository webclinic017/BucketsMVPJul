import React, { useState, useEffect } from "react";
// import sections
import axios from "axios";
import Hero from "../Components/sections/Hero";
import FeaturesTiles from "../Components/sections/FeaturesTiles";
import FeaturesSplit from "../Components/sections/FeaturesSplit";
import Testimonial from "../Components/sections/Testimonial";
import Cta from "../Components/sections/Cta";
import Footer from "../Components/layout/Footer";
import Header from "../Components/layout/Header";
import "../Assets/scss/style.scss";
import "../Assets/styles/popupStyles.css";
import WaitingList from "./WaitingList";
import Aos from "aos";
import "aos/dist/aos.css";
const Home = () => {
  useEffect(() => {
    Aos.init({ duration: 1000 });
  });
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
      <Header />
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

      <div className="brokerageHeader" data-aos="fade-up">
        <h2 class="mt-0 mb-0">Coming soon to these platforms</h2>
      </div>
      <div className="brokerageContainer" data-aos="fade-up">
        <div className="brokerage">
          <a
            id="brokerage-fidelity"
            target="_blank"
            class="brokerageImage"
            href="https://www.fidelity.ca/"
          ></a>
          <a
            id="brokerage-coinbase"
            target="_blank"
            class="brokerageImage"
            href="https://www.coinbase.com/"
          ></a>
          <a
            id="brokerage-robinhood"
            target="_blank"
            class="brokerageImage"
            href="https://robinhood.com"
          ></a>
          <a
            id="brokerage-alpaca"
            target="_blank"
            class="brokerageImage"
            href="https://alpaca.markets/"
          ></a>
          <a
            id="brokerage-cs"
            target="_blank"
            class="brokerageImage"
            href="https://www.schwab.com/"
          ></a>
          <a
            id="brokerage-wealthsimple"
            target="_blank"
            class="brokerageImage"
            href="https://www.wealthsimple.com"
          ></a>
          <a
            id="brokerage-td"
            target="_blank"
            class="brokerageImage"
            href="https://www.tdameritrade.com/"
          ></a>
        </div>
      </div>
      <Cta split addToList={openWaitingList} />
      <Footer />
    </div>
  );
};

export default Home;
