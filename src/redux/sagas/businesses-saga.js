import { put, takeEvery, takeLatest, call, all } from "redux-saga/effects";
import {
  getBusinesses,
  getCategoryListOfBusiness,
  getCoachListOfBusiness,
} from "../../services/businesses-service";
import { setError, startLoading, stopLoading } from "../action/shared-actions";
import { businessesActionTypes } from "../types";

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
    yield put(
      setError(
        error,
        "Something went wrong while getting the list of businesses"
      )
    );
  }
}

export function* watchGetBusinesses() {
  yield takeEvery(businessesActionTypes.GET_BUSINESSES, getBusinessList);
}

export function* getCategoriesOfBusiness(action) {
  try {
    const categoryList = yield call(getCategoryListOfBusiness, action.payload);
    yield put({
      type: businessesActionTypes.GET_CATEGORIES_OF_BUSINESS_SUCCEEDED,
      payload: categoryList,
    });
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting the list of Categories  of the business"
      )
    );
  }
}

export function* watchGetCategoriesOfBusiness() {
  yield takeLatest(
    businessesActionTypes.GET_CATEGORIES_OF_BUSINESS,
    getCategoriesOfBusiness
  );
}

export function* getCoachesOfBusiness(action) {
  try {
    const coachList = yield call(getCoachListOfBusiness, action.payload);
    yield put({
      type: businessesActionTypes.GET_COACHES_OF_BUSINESS_SUCCEEDED,
      payload: coachList,
    });
  } catch (error) {
    yield put(
      setError(
        error,
        "Something went wrong while getting coaches  of the business"
      )
    );
  }
}

export function* watchGetCoachesOfBusiness() {
  yield takeLatest(
    businessesActionTypes.GET_COACHES_OF_BUSINESS,
    getCoachesOfBusiness
  );
}

export default function* businessesSagas() {
  yield all([
    watchGetBusinesses(),
    watchGetCategoriesOfBusiness(),
    watchGetCoachesOfBusiness(),
  ]);
}
