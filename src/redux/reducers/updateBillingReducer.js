import { billingActionTypes } from "../types";

const initialState = {
  billData:[]
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case billingActionTypes.UPDATE_PAYMENT_DETAILS_OF_MEMBER:
      return { ...state, billData:action.payload};
    default:
      return state;
  }
}
