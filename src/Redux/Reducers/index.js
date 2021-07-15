import { combineReducers } from 'redux';
import auth from "./auth";
import bucket from "./bucket";

export default combineReducers({
  auth,
  bucket
});