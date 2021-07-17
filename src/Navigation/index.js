import React, { useEffect } from 'react';
import { BrowserRouter as Router, Switch, Route } from 'react-router-dom';
import { useDispatch, useSelector } from 'react-redux';
import CreateBucket from "../Screens/CreateBucket";
import EditBucket from "../Screens/EditBucket";
import Portfolio from "../Screens/Portfolio";
import Homepage from "../Screens/Homepage";
import Loading from "../Screens/Loading";
import AlpacaAuthorization from "../Screens/AlpacaAuthorization";
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
        <Route path='/' exact component={Homepage} />
        <Route path='/authorize-alpaca' component={AlpacaAuthorization} />
        <Route path='/create-bucket' exact component={CreateBucket} />
        <Route path='/edit-bucket/:id' exact component={EditBucket} />
        <Route path='/bucket/:id' exact component={Portfolio} />
        <Route path='/my-buckets' exact component={Buckets} />
      </Switch>
    </Router>
  );
}

export default Navigation;