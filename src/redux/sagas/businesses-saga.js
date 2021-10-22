import { put, takeEvery, call, all } from "redux-saga/effects";
import { getBusinesses } from "../../services/businesses-service";
import { businessesActionTypes } from "../types";

export function* getBusinessList(action) {
  try {
    yield put({ type: businessesActionTypes.SET_LOADING, payload: true });
    const businesses = yield call(getBusinesses);
    yield put({
      type: businessesActionTypes.GET_BUSINESSES_SUCCEEDED,
      payload: businesses,
    });
  } catch (error) {
    yield put({
      type: businessesActionTypes.GET_BUSINESSES_FAILED,
      payload: error.message,
    });
  }
}

export function* businessesListSaga() {
  yield takeEvery(businessesActionTypes.GET_BUSINESSES, getBusinessList);
}

export default function* businessesSagas() {
  yield all([businessesListSaga()]);
}
