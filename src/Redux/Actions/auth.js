import APIClient from "../../Services";
import {
  showToast
} from "../../Utils";
import {
  SET_IS_FETCHING,
  SET_IS_POSTING,
  USER_LOGIN,
  USER_LOGOUT,
  FETCH_USER
} from "../Constants";

const setIsFetching = (status) => {
  return {
    type: SET_IS_FETCHING,
    payload: status
  };
}

const setIsPosting = (status) => {
  return {
    type: SET_IS_POSTING,
    payload: status
  };
}

const fetchUser = (onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsFetching(true));
    APIClient.get('/auth/fetch-user').then((response)=>{
      if(response.data.success === true) {
        console.log(response.data.user)
        dispatch({
          type: FETCH_USER,
          payload: {
            user: response.data.user
          }
        });
        onSuccess();
      } else {
        dispatch(setIsFetching(false));
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsFetching(false));
      showToast(error.message, "error");
      onError();
    });
  }
)

const googleLogin = (data, onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch(setIsPosting(true));
    APIClient.post('/auth/google-login', data).then((response)=>{
      if(response.data.success === true) {
        dispatch({
          type: USER_LOGIN,
          payload: {
            user: response.data.user
          }
        });
        onSuccess(response.data.accessToken);
      } else {
        dispatch(setIsPosting(false));
        showToast(response.data.message, "error");
        onError();
      }
    }).catch((error)=>{
      dispatch(setIsPosting(false));
      showToast(error.message, "error");
      onError();
    });
  }
)

const logoutUser = (onSuccess=()=>{}, onError=()=>{}) => (
  (dispatch) => {
    dispatch({
      type: USER_LOGOUT
    });
    onSuccess();
  }
)

export {
  setIsFetching,
  googleLogin,
  logoutUser,
  fetchUser,
};