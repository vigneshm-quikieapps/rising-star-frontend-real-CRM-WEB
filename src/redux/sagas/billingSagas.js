import { put, takeEvery, call, all } from "redux-saga/effects";
import { billingActionTypes } from "../types";

import { getPaymentDetailsOfSession } from "../../services/billingServices";

import { startLoading, stopLoading, setError } from "../action/shared-actions";

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
    yield put(
      setError(
        error,
        "Something went wrong while getting the payment details of a session"
      )
    );
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
