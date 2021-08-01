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
import Buckets from "../Screens/Buckets";
import {
  fetchUser,
  setIsFetching
} from "../Redux/Actions/auth";
import { insertTokenInHeaders } from "../Services";
import { decryptDataString } from '../Utils';

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
      <Menu />
      <Switch>
        <CustomRoute path='/' exact component={GetStarted} />
        <CustomRoute path='/home' exact component={Homepage} />
        <CustomRoute isProtected path='/authorize-alpaca' component={AlpacaAuthorization} />
        <CustomRoute path='/create-bucket' exact component={CreateBucket} />
        <CustomRoute isProtected path='/edit-bucket/:id' exact component={EditBucket} />
        <CustomRoute isProtected path='/stock/:id' exact component={StockDetails} />
        <CustomRoute path='/bucket/:id' exact component={Portfolio} />
        <CustomRoute isProtected path='/my-buckets' exact component={Buckets} />
        <CustomRoute isProtected path='/settings' exact component={Settings} />
        <CustomRoute path='/login' exact component={Login} />
      </Switch>
    </Router>
  );
}

export default Navigation;
