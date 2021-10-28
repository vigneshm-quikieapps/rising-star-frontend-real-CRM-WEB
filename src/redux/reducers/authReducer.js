import { LoginActionTypes } from "../types";

const INITIAL_STATE = {
  currentUser: null,
  error: null,
};

const authReducer = (state = INITIAL_STATE, action) => {
  switch (action.type) {
    case LoginActionTypes.LOG_IN_SUCCESS:
      window.location.href = "/";
      return {
        ...state,
        currentUser: action.payload,
        error: null,
      };
    case LoginActionTypes.LOG_IN_FAILURE:
      return {
        ...state,
        error: action.payload,
      };
    case LoginActionTypes.LOG_OUT:
      return INITIAL_STATE;
    default:
      return state;
  }
};

export default authReducer;
