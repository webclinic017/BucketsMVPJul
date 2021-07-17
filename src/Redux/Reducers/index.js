import { combineReducers } from 'redux';
import auth from "./auth";
import bucket from "./bucket";
import alpaca from "./alpaca";

export default combineReducers({
  auth,
  bucket,
  alpaca,
});