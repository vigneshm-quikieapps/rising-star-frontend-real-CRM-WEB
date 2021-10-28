import { sharedActionTypes } from "../types";
const initialState = { errors: [] };

const sharedReducer = (state = initialState, action) => {
  switch (action.type) {
    case sharedActionTypes.SET_ERROR: {
      if (!action.payload) return state;
      const updatedErrors = [...state.errors];
      updatedErrors.push(action.payload);
      return { ...state, errors: updatedErrors };
    }
    case sharedActionTypes.REMOVE_ERROR: {
      const updatedErrors = [...state.errors];
      updatedErrors.shift();
      return { ...state, errors: updatedErrors };
    }
    case sharedActionTypes.CLEAR_ERRORS: {
      return { ...state, errors: [] };
    }
    default:
      return state;
  }
};

export default sharedReducer;
