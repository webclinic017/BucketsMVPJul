import { combineReducers } from 'redux';
import auth from "./auth";
import bucket from "./bucket";
import alpaca from "./alpaca";
import app from "./app";

export default combineReducers({
  app,
  auth,
  bucket,
  alpaca,
});