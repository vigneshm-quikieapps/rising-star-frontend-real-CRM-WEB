import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  getBusinesses,
  getBusinessListOfBusiness,
  getCategoryListOfBusiness,
} from "../../services/businesses-service";
import { startLoading, stopLoading } from "../action/shared-actions";
import { businessesActionTypes, sharedActionTypes } from "../types";

export function* getBusinessList() {
  try {
    yield put(startLoading());
    const businesses = yield call(getBusinesses);
    yield put({
      type: businessesActionTypes.GET_BUSINESSES_SUCCEEDED,
      payload: businesses,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
        "Something went wrong while getting the list of businesses",
    });
  }
}

export function* watchGetBusinesses() {
  yield takeEvery(businessesActionTypes.GET_BUSINESSES, getBusinessList);
}

export function* getBusinessesOfBusiness() {
  try {
    yield put(startLoading());
    const businessList = yield call(getBusinessListOfBusiness);
    yield put({
      type: businessesActionTypes.GET_BUSINESSES_OF_BUSINESS_SUCCEEDED,
      payload: businessList,
    });
    yield put(stopLoading());
  } catch (error) {
    yield put({
      type: sharedActionTypes.SET_ERROR,
      payload:
        error?.response?.data?.message ||
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

export function* getCategoriesOfBusiness(action) {
  try {
    yield put({ type: businessesActionTypes.SET_LOADING, payload: true });
    const categoryList = yield call(getCategoryListOfBusiness, action.payload);
    yield put({
      type: businessesActionTypes.GET_CATEGORIES_OF_BUSINESS_SUCCEEDED,
      payload: categoryList,
    });
  } catch (error) {
    yield put({
      type: businessesActionTypes.GET_CATEGORIES_OF_BUSINESS_FAILED,
      payload:
        error.response.data.message ||
        "Something went wrong while getting the list of Categories  of the business",
    });
  }
}

export function* watchGetCategoriesOfBusiness() {
  yield takeLatest(
    businessesActionTypes.GET_CATEGORIES_OF_BUSINESS,
    getCategoriesOfBusiness
  );
}

export default function* businessesSagas() {
  yield all([
    watchGetBusinesses(),
    watchGetBusinessesOfBusiness(),
    watchGetCategoriesOfBusiness(),
  ]);
}
