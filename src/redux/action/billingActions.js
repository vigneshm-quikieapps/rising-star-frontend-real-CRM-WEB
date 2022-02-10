import { billingActionTypes } from "../types";

export const getPaymentDetailsOfSession = (params) => {
  return {
    type: billingActionTypes.GET_PAYMENT_DETAILS_OF_SESSION,
    payload: params,
  };
};

export const updatePaymentDetailsOfMembers = (params) => {
  let p = [
    {
      billId: "61bb75e206cdceae353e2f54",
      transactions: [
        {
          reference: "some note1",
          _id: "61de94f1dfd21b169681b28d",
        },
        {
          reference: "some note2",
          _id: "61af59941309d48f504a430a",
        },
      ],
    },
    {
      billId: "61bb75e206cdceae353e2f58",
      transactions: [
        {
          reference: "some note3",
          _id: "61b9ac6ebd9b92e146602985",
        },
        {
          reference: "some note4",
          _id: "61a89a5d8edac3e940293cae",
        },
      ],
    },
  ];
  return {
    type: billingActionTypes.UPDATE_PAYMENT_DETAILS_OF_MEMBER,
    payload: params,
  };
};
