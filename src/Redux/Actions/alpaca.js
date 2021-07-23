import {
  SET_IS_LINKING,
  LOGIN_INTO_ALPACA_ACCOUNT,
  LOGOUT_FROM_ALPACA_ACCOUNT
} from "../Constants";
import APIClient from "../../Services";
import { showToast } from "../../Utils";

const setIsLinking = (status) => {
  return {
    type: SET_IS_LINKING,
    payload: status
  };
}

const getAlpacaAccessToken = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsLinking(true));
    APIClient.post('/alpaca/get-access-token', data).then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: LOGIN_INTO_ALPACA_ACCOUNT,
          payload: {accessToken: response.data.alpacaAccessToken}
        });
        showToast(response.data.message, "success");
        onSuccess();
      } else {
        dispatch(setIsLinking(false));
        showToast(response.data.message, "error");
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsLinking(false));
      showToast(error.message, "error");
      onError();
    });
  }
)

const logoutFromAlpacaAccount = (onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    APIClient.get('/logout-from-alpaca-account').then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: LOGOUT_FROM_ALPACA_ACCOUNT
        });
        showToast(response.data.message);
        onSuccess();
      } else {
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      showToast(error.message);
      onError();
    });
  }
)

const placeBucketLevelOrderOnAlpaca = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    APIClient.post('/place-order-on-alpaca', data).then((response)=>{
      if(response.data.status === 200) {
        dispatch({
          type: LOGOUT_FROM_ALPACA_ACCOUNT
        });
        showToast(response.data.message);
        onSuccess();
      } else {
        showToast(response.data.message);
        onError();
      }
    }).catch((error)=>{
      showToast(error.message);
      onError();
    });
  }
)

export {
  getAlpacaAccessToken,
  logoutFromAlpacaAccount,
  placeBucketLevelOrderOnAlpaca,
};