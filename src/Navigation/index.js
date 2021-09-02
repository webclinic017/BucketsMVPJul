import React, { useEffect } from 'react';
import { BrowserRouter as Router, Redirect, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateBucket from "../Screens/CreateBucket";
import EditBucket from "../Screens/EditBucket";
import Portfolio from "../Screens/Portfolio";
import Login from "../Screens/Login";
import Settings from "../Screens/Settings";
import GetStarted from "../Screens/GetStarted";
import Homepage from "../Screens/Homepage";
import StockDetails from "../Screens/StockDetails";
import Loading from "../Screens/Loading";
import Menu from "./Menu";
import AlpacaAuthorization from "../Screens/AlpacaAuthorization";
import UserBuckets from "../Screens/UserBuckets";
import ExpertBuckets from "../Screens/ExpertBuckets";
import {
  fetchUser,
  setIsFetching
} from "../Redux/Actions/auth";
import { insertTokenInHeaders } from "../Services";
import { decryptDataString } from '../Utils';
import {Helmet} from "react-helmet";
import { scrollToTop } from 'react-scroll/modules/mixins/animate-scroll';

const CustomRoute = ({isProtected, path, exact, component}) => {
  const user = useSelector(state=>state.auth.user);
  const isAuthenticated = useSelector(state=>state.auth.isAuthenticated);

  if(isProtected) {
    if(user && isAuthenticated) {
      return <Route path={path} exact={exact} component={component}/>;
    } else {
      return <Redirect to="/login"/>;
    }
  } else if(path==="/login" && user && isAuthenticated) {
    return <Redirect to="/"/>;
  } else {
    return <Route path={path} exact={exact} component={component}/>;
  }
}

const Navigation = () => {
  const dispatch = useDispatch();
  const isFetching = useSelector(state => state.auth.isFetching);

  useEffect(() => {
    const encryptedBucketAuth = localStorage.getItem("bucket_session");
    if(encryptedBucketAuth !== undefined && encryptedBucketAuth !== null) {
      const bucketAuth = decryptDataString(encryptedBucketAuth);
      insertTokenInHeaders(bucketAuth);
      dispatch(fetchUser());
    } else {
      dispatch(setIsFetching(false));
    }
  }, []);

  if(isFetching) return(<Loading />);

  return (
    <Router>
      <Helmet>
        <title>Buckets Investing</title>
        <meta name="description" content="Build a smart portfolio in minutes with no management fees. Customers can create smart investment baskets on Buckets in minutes to automate investing (the wrapper function for your brokerage). A bucket is a basket of exchange traded securities, similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors.Investing is all about risk. There is no way around this fact. The more risk you take, the higher the returns.
          A bucket is a basket of exchange traded securities, similar to ETFs and mutual funds, that can be bought or sold directly from your brokerage and can be created by you, your friends or “expert” investors. Bucket is a casual term that portfolio managers and investors frequently use to allude to a cluster of assets. Customers can browse and buy pre-made portfolios created by other users or “experts”. Our purpose is to provide a more effective alternative to traditional investment funds such as ETFs and mutual funds and become the creator economy for stock and cryptocurrency portfolios. Using a bucket strategy can help you control your emotions and prevent you from selling investments out of fear. 
          " />
        <meta name="keywords" content="Stocks, Portfolios, Cluster of Assets,  Exchange Traded Funds, Mutual Funds, Investing, "/>

      </Helmet>
      <Menu />
      <Switch>
        <CustomRoute path='/' exact component={GetStarted} />
        <CustomRoute path='/home' exact component={Homepage} />
        <CustomRoute path='/browse' isProtected exact component={ExpertBuckets} />
        <CustomRoute isProtected path='/authorize-alpaca' component={AlpacaAuthorization} />
        <CustomRoute path='/create-bucket' exact component={CreateBucket} />
        <CustomRoute isProtected path='/edit-bucket/:id' exact component={EditBucket} />
        <CustomRoute isProtected path='/stock/:id' exact component={StockDetails} />
        <CustomRoute isProtected path='/bucket/:id' exact component={Portfolio} />
        <CustomRoute isProtected path='/my-buckets' exact component={UserBuckets} />
        <CustomRoute isProtected path='/settings' exact component={Settings} />
        <CustomRoute path='/login' exact component={Login} />
      </Switch>
    </Router>
  );
}

export default Navigation;
