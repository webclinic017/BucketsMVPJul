import {
  LOGIN_INTO_ALPACA_ACCOUNT,
  LOGOUT_FROM_ALPACA_ACCOUNT,
  SET_IS_PLACING_ORDER,
  SET_IS_FETCHING,
  SET_IS_POSTING,
  SET_IS_LINKING,
  USER_LOGOUT,
  USER_LOGIN,
  FETCH_USER,
} from "../Constants";

const initState = {
  isPosting: false,
  isLinking: false,
  isPlacingOrder: false,
  alpacaAuth: null,
  isFetching: true,
  isAlpacaAuthenticated: false
};

export default (state=initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_IS_POSTING: {
      return {
        ...state,
        isPosting: payload
      };
    }

    case SET_IS_LINKING: {
      return {
        ...state,
        isLinking: payload
      };
    }

    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: payload
      };
    }

    case SET_IS_PLACING_ORDER: {
      return {
        ...state,
        isPlacingOrder: payload
      };
    }

    case LOGIN_INTO_ALPACA_ACCOUNT: {
      return {
        ...state,
        isLinking: false,
        alpacaAuth: action.payload,
        isAlpacaAuthenticated: true
      };
    }

    case LOGOUT_FROM_ALPACA_ACCOUNT: {
      return {
        ...state,
        alpacaAuth: null,
        isAlpacaAuthenticated: false
      };
    }

    case FETCH_USER: {
      let updates = {};
      if(payload.user.hasOwnProperty("alpacaAccessToken")) {
        updates["alpacaAuth"] = {"accessToken": payload.user.alpacaAccessToken};
        updates["isAlpacaAuthenticated"] = true;
        updates["isLinking"] = false;
      }
      return {
        ...state,
        ...updates
      };
    }

    case USER_LOGIN: {
      let updates = {};
      if(payload.user.hasOwnProperty("alpacaAccessToken")) {
        updates["alpacaAuth"] = {"accessToken": payload.user.alpacaAccessToken};
        updates["isAlpacaAuthenticated"] = true;
        updates["isLinking"] = false;
      }
      return {
        ...state,
        ...updates
      };
    }

    case USER_LOGOUT: {
      return {
        ...initState,
        isFetching: false
      };
    }
  
    default: {
      return state;
    }
  }
}