//rest - json response; normal - html response
import { Provider } from 'react-redux';
import 'toastr/build/toastr.min.css';
import store from "./Redux";
import Navigation from "./Navigation";
import React from "react";
import { Helmet } from "react-helmet";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
      <div className="App">
      <Helmet>
        <title>Buckets Investing</title>
        <meta name="Create a playlist of stocks today" content="Investing Simplified" />
      </Helmet>
    </div>
    </Provider>
  );
}

export default App;
