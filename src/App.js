//rest - json response; normal - html response
import { Provider } from "react-redux";
import "toastr/build/toastr.min.css";
import store from "./Redux";
import Navigation from "./Navigation";
import React from "react";
import { Helmet } from "react-helmet";
// import { Helmet } from "react-helmet";
import Deck from "./Deck";
// import "./Assets/scss/style.scss";
const App = () => {
  return (
    <Provider store={store}>
      <Helmet>
        <title>Buckets Investing</title>
        <meta
          name="description"
          content="Build a smart portfolio in minutes with no management fees. Customers can create smart investment baskets on Buckets in minutes to automate investing (the wrapper function for your brokerage). A bucket is a basket of exchange traded securities, similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors.Investing is all about risk. There is no way around this fact. The more risk you take, the higher the returns.
          A bucket is a basket of exchange traded securities, similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors. Bucket is a casual term that portfolio managers and investors frequently use to allude to a cluster of assets. Customers can browse and buy pre-made portfolios created by other users or “experts”. Our purpose is to provide a more effective alternative to traditional investment funds such as ETFs and mutual funds and become the creator economy for stock and cryptocurrency portfolios. Using a bucket strategy can help you control your emotions and prevent you from selling investments out of fear. 
          "
        />
        <meta
          name="keywords"
          content="Stocks, Portfolios, Cluster of Assets,  Exchange Traded Funds, Mutual Funds, Investing, "
        />
      </Helmet>

      <Navigation />
    </Provider>
  );
};

export default App;
