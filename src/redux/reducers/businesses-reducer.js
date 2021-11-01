import { businessesActionTypes } from "../types";

const initialState = {
  totalPages: 1,
  currentPage: 1,
  businessList: [],
  categoriesOfBusiness: [],
  coachesOfBusiness: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case businessesActionTypes.GET_BUSINESSES_SUCCEEDED:
      return { ...state, businessList: action.payload };
    case businessesActionTypes.GET_CATEGORIES_OF_BUSINESS_SUCCEEDED: {
      const { docs, totalPages, currentPage } = action.payload;
      return {
        ...state,
        categoriesOfBusiness: docs,
        totalPages,
        currentPage,
      };
    }
    case businessesActionTypes.GET_COACHES_OF_BUSINESS_SUCCEEDED: {
      return {
        ...state,
        coachesOfBusiness: action.payload,
      };
    }
    default:
      return state;
  }
}
