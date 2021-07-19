import {
  SET_NAV_MENU_VISIBILITY,
  USER_LOGOUT
} from "../Constants";

const initState = {
  isNavMenuVisible: false
};

export default (state=initState, action) => {
  const {type, payload} = action;
  switch (type) {
    case SET_NAV_MENU_VISIBILITY: {
      return {
        ...state,
        isNavMenuVisible: payload
      };
    }

    case USER_LOGOUT: {
      return initState;
    }
  
    default: {
      return state;
    }
  }
}