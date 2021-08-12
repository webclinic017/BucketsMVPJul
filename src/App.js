//rest - json response; normal - html response
import { Provider } from 'react-redux';
import 'toastr/build/toastr.min.css';
import store from "./Redux";
import Navigation from "./Navigation";
import React from "react";
// import { Helmet } from "react-helmet";

const App = () => {
  return (
    <Provider store={store}>
      <Navigation />
    </Provider>
  );
}

export default App;
