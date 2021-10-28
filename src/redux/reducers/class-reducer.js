import { classActionTypes } from "../types";

const initialState = {
  classList: [],
  totalPages: 1,
  currentPage: 1,
  loading: false,
  class: null,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case classActionTypes.SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case classActionTypes.GET_CLASS_LIST_SUCCEEDED: {
      const { classList, totalPages, currentPage } = action.payload;
      return {
        ...state,
        classList,
        totalPages,
        currentPage,
        loading: false,
      };
    }
    case classActionTypes.DELETE_CLASS_SUCCEEDED: {
      const updatedClassList = state.classList.filter(
        (singleClass) => singleClass._id !== action.payload
      );
      return {
        ...state,
        classList: updatedClassList,
        loading: false,
      };
    }
    case classActionTypes.GET_CLASS_BY_ID: {
      return { ...state, class: action.payload };
    }
    default:
      return state;
  }
}
