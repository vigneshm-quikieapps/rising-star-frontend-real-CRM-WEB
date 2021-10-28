import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  getBusinesses,
  getBusinessListOfBusiness,
} from "../../services/businesses-service";
import { businessesActionTypes, sharedActionTypes } from "../types";

export function* getBusinessList() {
  try {
    yield put({ type: businessesActionTypes.SET_LOADING, payload: true });
    const businesses = yield call(getBusinesses);
    yield put({
      type: businessesActionTypes.GET_BUSINESSES_SUCCEEDED,
      payload: businesses,
    });
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error.response.data.message ||
        "Something went wrong while getting the list of businesses",
    });
  }
}

export function* watchGetBusinesses() {
  yield takeEvery(businessesActionTypes.GET_BUSINESSES, getBusinessList);
}

export function* getBusinessesOfBusiness() {
  try {
    yield put({ type: businessesActionTypes.SET_LOADING, payload: true });
    const businessList = yield call(getBusinessListOfBusiness);
    yield put({
      type: businessesActionTypes.GET_BUSINESSES_OF_BUSINESS_SUCCEEDED,
      payload: businessList,
    });
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error.response.data.message ||
        "Something went wrong while getting the list of businesses of the user",
    });
  }
}

export function* watchGetBusinessesOfBusiness() {
  yield takeLatest(
    businessesActionTypes.GET_BUSINESSES_OF_BUSINESS,
    getBusinessesOfBusiness
  );
}

export default function* businessesSagas() {
  yield all([watchGetBusinesses(), watchGetBusinessesOfBusiness()]);
}
