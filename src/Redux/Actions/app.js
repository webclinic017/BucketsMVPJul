import {
  SET_NAV_MENU_VISIBILITY
} from "../Constants";

const setNavMenuVisibility = (status) => {
  return {
    type: SET_NAV_MENU_VISIBILITY,
    payload: status
  };
}

export {
  setNavMenuVisibility
};