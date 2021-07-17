import {
  LOGIN_INTO_ALPACA_ACCOUNT,
  LOGOUT_FROM_ALPACA_ACCOUNT,
  SET_IS_FETCHING,
  SET_IS_POSTING,
  SET_IS_LINKING
} from "../Constants";

const FETCH_USER = "FETCH_USER";
const USER_LOGIN = "USER_LOGIN";
const USER_LOGOUT = "USER_LOGOUT";

const initState = {
  isPosting: false,
  isLinking: false,
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

    // case FETCH_USER: {
    //   return {
    //     ...state,
    //     user: payload.user,
    //     isFetching: false,
    //     alpacaAuth: payload.alpaca,
    //     isAlpacaAuthenticated: payload.alpaca.access_token ? true : false,
    //     isAuthenticated: true
    //   };
    // }

    // case USER_LOGIN: {
    //   return {
    //     ...state,
    //     user: payload.user,
    //     isPosting: false,
    //     alpacaAuth: payload.alpaca,
    //     isAlpacaAuthenticated: payload.alpaca.access_token ? true : false,
    //     isAuthenticated: true
    //   };
    // }

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