import { classActionTypes } from "../types";

const initialState = {
  classList: [],
  totalPages: 1,
  currentPage: 1,
  class: { business: {} },
  classSessions: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case classActionTypes.GET_CLASS_LIST_SUCCEEDED: {
      const { classList, totalPages, currentPage } = action.payload;
      return {
        ...state,
        classList,
        totalPages,
        currentPage,
      };
    }
    case classActionTypes.DELETE_CLASS_SUCCEEDED: {
      const updatedClassList = state.classList.filter(
        (singleClass) => singleClass._id !== action.payload
      );
      return {
        ...state,
        classList: updatedClassList,
      };
    }
    case classActionTypes.GET_CLASS_BY_ID_SUCCEEDED: {
      return { ...state, class: action.payload };
    }
    case classActionTypes.ADD_CLASS_SUCCEEDED: {
      let updatedClassList = [...state.classList];
      let newClass = action.payload.businessClass;
      updatedClassList.push(newClass);
      return {
        ...state,
        class: newClass,
        classList: updatedClassList,
      };
    }

    case classActionTypes.EDIT_CLASS_SUCCEEDED: {
      let newClass = action.payload.businessClass;

      let updatedClassList = state.classList.map((item) => {
        if (item._id === newClass._id) {
          return newClass;
        }
        return item;
      });
      return {
        ...state,
        class: newClass,
        classList: updatedClassList,
      };
    }
    case classActionTypes.GET_CLASS_SESSIONS_SUCCEEDED: {
      return { ...state, classSessions: action.payload };
    }
    default:
      return state;
  }
}
