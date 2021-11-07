import { sharedActionTypes } from "../types";
const initialState = { errors: [], loading: 0 };

const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case sharedActionTypes.SET_ERROR: {
      if (!action.payload) return state;
      const updatedErrors = [...state.errors];
      updatedErrors.push(action.payload);
      return { ...state, errors: updatedErrors, loading: state.loading - 1 };
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
      return { ...state, loading: state.loading + 1 };
    }
    case sharedActionTypes.STOP_LOADING: {
      return { ...state, loading: state.loading - 1 };
    }
    default:
      return state;
  }
};

export default sharedReducer;
