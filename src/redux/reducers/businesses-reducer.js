import { businessesActionTypes } from "../types";

const initialState = {
  businessList: [],
  businessListOfBusiness: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case businessesActionTypes.GET_BUSINESSES_SUCCEEDED:
      return { ...state, businessList: action.payload };
    case businessesActionTypes.GET_BUSINESSES_OF_BUSINESS_SUCCEEDED: {
      return {
        ...state,
        businessListOfBusiness: action.payload,
      };
    }
    default:
      return state;
  }
}
