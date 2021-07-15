import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import Portfolio from "../Screens/Portfolio";
import Loading from "../Screens/Loading";
import Buckets from "../Screens/Buckets";
import {
  fetchUser,
  setIsFetching
} from "../Redux/Actions/auth";
import { insertTokenInHeaders } from "../Services";
import { decryptDataString } from '../Utils';

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
      <Switch>
        <Route path='/' exact component={Portfolio} />
        <Route path='/my-buckets' exact component={Buckets} />
      </Switch>
    </Router>
  );
}

export default Navigation;