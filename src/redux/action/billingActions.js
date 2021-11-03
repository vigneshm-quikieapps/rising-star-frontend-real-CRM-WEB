import { billingActionTypes } from "../types";

export const getPaymentDetailsOfSession = (params) => {
  return {
    type: billingActionTypes.GET_PAYMENT_DETAILS_OF_SESSION,
    payload: params,
  };
};
