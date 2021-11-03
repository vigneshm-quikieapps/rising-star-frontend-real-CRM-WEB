import { put, takeEvery, call, all } from "redux-saga/effects";
import { billingActionTypes, sharedActionTypes } from "../types";

import { getPaymentDetailsOfSession } from "../../services/billingServices";

import { startLoading, stopLoading } from "../action/shared-actions";

export function* getPaymentDetailsOfSessionInAClass(action) {
  try {
    yield put(startLoading());
    const paymentList = yield call(getPaymentDetailsOfSession, action.payload);
    yield put({
      type: billingActionTypes.GET_PAYMENT_DETAILS_OF_SESSION_SUCCEEDED,
      payload: paymentList,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the evaluation scheme list",
    });
  }
}

export function* watchgetPaymentDetailsOfSessionInAClass() {
  yield takeEvery(
    billingActionTypes.GET_PAYMENT_DETAILS_OF_SESSION,
    getPaymentDetailsOfSessionInAClass
  );
}

export default function* billingSagas() {
  yield all([watchgetPaymentDetailsOfSessionInAClass()]);
}
