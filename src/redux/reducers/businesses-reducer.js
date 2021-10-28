import { businessesActionTypes } from "../types";

const initialState = {
  businessList: [],
  businessListOfBusiness: [],
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
    default:
      return state;
  }
}
