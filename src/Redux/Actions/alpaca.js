import axios from "axios";
import {
  SET_IS_LINKING,
  SET_IS_PLACING_ORDER,
  LOGIN_INTO_ALPACA_ACCOUNT,
  LOGOUT_FROM_ALPACA_ACCOUNT,
  SET_SINGLE_STOCK_ALPACA_ORDER,
} from "../Constants";
import APIClient from "../../Services";
import { showToast } from "../../Utils";

const setIsLinking = (status) => {
  return {
    type: SET_IS_LINKING,
    payload: status,
  };
};

const setIsPlacingOrder = (status) => {
  return {
    type: SET_IS_PLACING_ORDER,
    payload: status,
  };
};

const getAlpacaAccessToken =
  (data, onSuccess = () => {}, onError = () => {}) =>
  (dispatch) => {
    dispatch(setIsLinking(true));
    APIClient.post("/alpaca/get-access-token", data)
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: LOGIN_INTO_ALPACA_ACCOUNT,
            payload: { accessToken: response.data.alpacaAccessToken },
          });
          showToast(response.data.message, "success");
          onSuccess();
        } else {
          dispatch(setIsLinking(false));
          showToast(response.data.message, "error");
          onError();
        }
      })
      .catch((error) => {
        dispatch(setIsLinking(false));
        showToast(error.message, "error");
        onError();
      });
  };

const logoutFromAlpacaAccount =
  (onSuccess = () => {}, onError = () => {}) =>
  (dispatch) => {
    APIClient.get("/logout-from-alpaca-account")
      .then((response) => {
        if (response.data.success === true) {
          dispatch({
            type: LOGOUT_FROM_ALPACA_ACCOUNT,
          });
          showToast(response.data.message, "success");
          onSuccess();
        } else {
          showToast(response.data.message, "error");
          onError();
        }
      })
      .catch((error) => {
        showToast(error.message, "error");
        onError();
      });
  };

const placeBucketLevelOrderOnAlpaca =
  (data, onSuccess = () => {}, onError = () => {}) =>
  (dispatch) => {
    dispatch(setIsPlacingOrder(true));
    axios
      .post("https://buckets-server.herokuapp.com/place-order-on-alpaca", data)
      .then((response) => {
        if (response.data.status === 200) {
          dispatch(setIsPlacingOrder(false));
          showToast(response.data.message, "success");
          onSuccess();
        } else {
          dispatch(setIsPlacingOrder(false));
          showToast(response.data.message, "error");
          onError();
        }
      })
      .catch((error) => {
        dispatch(setIsPlacingOrder(false));
        showToast(error.message, "error");
        onError();
      });
  };

const placeStockLevelOrderOnAlpaca =
  (data, onSuccess = () => {}, onError = () => {}) =>
  (dispatch) => {
    dispatch(setIsPlacingOrder(true));
    axios
      .post(
        "https://buckets-server.herokuapp.com/place-single-stock-alpaca-order",
        data
      )
      .then((response) => {
        if (response.data.status === 200) {
          dispatch({
            type: SET_SINGLE_STOCK_ALPACA_ORDER,
            payload: {
              stockId: data.stockId,
              order: response.data.order,
            },
          });
          dispatch(setIsPlacingOrder(false));
          showToast(response.data.message, "success");
          onSuccess();
        } else {
          dispatch(setIsPlacingOrder(false));
          showToast(response.data.message, "error");
          onError();
        }
      })
      .catch((error) => {
        dispatch(setIsPlacingOrder(false));
        showToast(error.message, "error");
        onError();
      });
  };

export {
  getAlpacaAccessToken,
  logoutFromAlpacaAccount,
  placeStockLevelOrderOnAlpaca,
  placeBucketLevelOrderOnAlpaca,
};
