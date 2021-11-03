import { billingActionTypes } from "../types";

const initialState = {
  paymentList: [],
  totalPages: 1,
  currentPage: 1,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case billingActionTypes.GET_PAYMENT_DETAILS_OF_SESSION_SUCCEEDED:
      const { docs, totalPages, page: currentPage } = action.payload;
      return { ...state, paymentList: docs, totalPages, currentPage };
    default:
      return state;
  }
}
