import { sharedActionTypes } from "../types";
const initialState = { errors: [], loading: false, pageTitle: "" };

const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case sharedActionTypes.SET_ERROR: {
      if (!action.payload) return state;
      const updatedErrors = [...state.errors];
      updatedErrors.push(action.payload);
      return { ...state, errors: updatedErrors, loading: false };
    }
    case sharedActionTypes.REMOVE_ERROR: {
      const updatedErrors = [...state.errors];
      updatedErrors.shift();
      return { ...state, errors: updatedErrors };
    }
    case sharedActionTypes.CLEAR_ERRORS: {
      return { ...state, errors: [] };
    }
    case sharedActionTypes.START_LOADING: {
      return { ...state, loading: true };
    }
    case sharedActionTypes.STOP_LOADING: {
      return { ...state, loading: false };
    }
    case sharedActionTypes.SET_PAGE_TITLE: {
      return { ...state, pageTitle: action.payload };
    }
    default:
      return state;
  }
};

export default sharedReducer;
