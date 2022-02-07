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
  const [FAQs, setFAQs] = useState([
    {
      id: 0,
      show: false,
      question: "What is a Bucket?",
      answer:
        "A Bucket is a model portfolio that represents an idea, theme or investing strategy. ",
    },
    {
      id: 1,
      show: false,
      question: "How will my information be secure?",
      answer:
        "We do not store your brokerage login credentials. We do not ask you for any personal information as you are able to invest in Buckets by simply linking your existing brokerage account (Robinhood). We do not look into your existing holdings and simply aim to be the platform where you can buy model portfolios. ",
    },
    {
      id: 2,
      show: false,
      question:
        "Why would I use Buckets when I can buy securities individually?",
      answer:
        "When building a website, you look for pre-made templates to use rather than build your own from scratch. Similarly, you are able to build and invest in long term, diversified portfolios in minutes with Buckets without having to pay any fees (for example, management fees)! ",
    },
    {
      id: 3,
      show: false,
      question: "How can I collaborate with friends? ",
      answer:
        "Think of a Bucket like a Google doc or a Github repo. This means you can ask your friends to share their buckets with you. Thereafter, you get notified when trades have been made and you can copy those changes to keep your Buckets updated. ",
    },
    {
      id: 4,
      show: false,
      question: "What if I want to change a Bucket after buying into it? ",
      answer:
        "Like a Google doc, you can edit your Buckets at any point. This means you can either buy/sell entire buckets or individual securities in those buckets whenever you wish. You have 100% control. ",
    },
    {
      id: 5,
      show: false,
      question: "What is the Buckets Investing Mission?",
      answer: "To make smart investing easy, collaborative and accessible. ",
    },
    {
      id: 6,
      show: false,
      question: "What are fees for Buckets? ",
      answer:
        "There are no cost to buy buckets. We do not ask for your credit card information.",
    },
    {
      id: 7,
      show: false,
      question: "What is the minimum investment amount?",
      answer:
        "The minimum investment amount varies per Bucket. It typically varies from $10 to $200 depending on the brokerage you are using and whether the securities being traded are fractional or not. ",
    },
  ]);
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

      <div className="brokerageHeader" data-aos="fade-up">
        <h2 className="mt-0 mb-0" style={{ marginTop: 80 }}>
          FAQs
        </h2>
      </div>
      <div className="container faq-container" data-aos="fade-up">
        {FAQs.map((item) => (
          <div>
            <div
              className="faq-question"
              onClick={() => {
                setFAQs((prev) =>
                  prev.map((faq) => {
                    return {
                      ...faq,
                      show: faq.id == item.id ? !faq.show : faq.show,
                    };
                  })
                );
              }}
            >
              <h4 className="faq-question-text">{item.question}</h4>
              <div className={item.show ? "faq-arrow-down" : "faq-arrow"}></div>
            </div>
            {item.show && (
              <div className="faq-response">
                <h4 className="faq-answer-text">{item.answer}</h4>
              </div>
            )}
          </div>
        ))}
      </div>
      <div
        data-aos="fade-up"
        className="container-l home-banner"
        style={{
          justifyContent: "center",
          alignItems: "center",
          // paddingTop: 80,
        }}
      >
        {/* <div className="downloadBtn">
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
        </div> */}
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
