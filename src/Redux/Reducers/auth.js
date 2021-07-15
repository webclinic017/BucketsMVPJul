import {
  SET_IS_FETCHING,
  SET_IS_POSTING,
  USER_LOGOUT,
  USER_LOGIN,
  FETCH_USER,
} from "../Constants";

const initState = {
  user: null,
  isPosting: false,
  isFetching: true,
  isAuthenticated: false,
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

    case SET_IS_FETCHING: {
      return {
        ...state,
        isFetching: payload
      };
    }

    case FETCH_USER: {
      return {
        ...state,
        user: payload.user,
        isFetching: false,
        isAuthenticated: true
      };
    }

    case USER_LOGIN: {
      return {
        ...state,
        user: payload.user,
        isPosting: false,
        isAuthenticated: true
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