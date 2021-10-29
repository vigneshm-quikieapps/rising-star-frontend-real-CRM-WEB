import { businessesActionTypes } from "../types";

const initialState = {
  totalPages: 1,
  currentPage: 1,
  businessList: [],
  businessListOfBusiness: [],
  categoriesOfBusiness: [],
  error: null,
  loading: false,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case businessesActionTypes.SET_LOADING: {
      return { ...state, loading: action.payload };
    }
    case businessesActionTypes.GET_BUSINESSES_SUCCEEDED:
      return { ...state, businessList: action.payload, loading: false };
    case businessesActionTypes.GET_BUSINESSES_FAILED:
      return { ...state, error: action.payload, loading: false };
    case businessesActionTypes.GET_BUSINESSES_OF_BUSINESS_SUCCEEDED: {
      return {
        ...state,
        businessListOfBusiness: action.payload,
        error: "",
        loading: false,
      };
    }
    case businessesActionTypes.GET_BUSINESSES_OF_BUSINESS_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }

    case businessesActionTypes.GET_CATEGORIES_OF_BUSINESS_SUCCEEDED: {
      const { docs, totalPages, currentPage } = action.payload;
      return {
        ...state,
        categoriesOfBusiness: docs,
        totalPages,
        currentPage,
        error: "",
        loading: false,
      };
    }

    case businessesActionTypes.GET_CATEGORIES_OF_BUSINESS_FAILED: {
      return { ...state, error: action.payload, loading: false };
    }
    default:
      return state;
  }
}
