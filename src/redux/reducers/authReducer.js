import { LoginActionTypes } from "../types";

const INITIAL_STATE = {
  currentUser: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginActionTypes.LOG_IN_SUCCESS:
      window.location.href = "/";
      return {
        ...state,
        currentUser: action.payload,
      };
    case LoginActionTypes.LOG_OUT:
      localStorage.clear();
      window.location = "/login";
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
