import React, { useRef, useEffect } from "react";
import { useLocation, Switch } from "react-router-dom";
import AppRoute from "./Utils/AppRoute";
import ScrollReveal from "./Utils/ScrollReveal";
import ReactGA from "react-ga";

// Layouts
import LayoutDefault from "./Layouts/LayoutDefault";

// Views
import Home from "./Views/Home";

// Initialize Google Analytics
const App = () => {
  return (
    <ScrollReveal
      ref={childRef}
      children={() => (
        <Switch>
          <AppRoute exact path="/" component={Home} layout={LayoutDefault} />
        </Switch>
      )}
    />
  );
};

export default App;
