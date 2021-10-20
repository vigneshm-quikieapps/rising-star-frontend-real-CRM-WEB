import { all, call } from "@redux-saga/core/effects";
import classSagas from "./class-sagas";
import businessesSagas from "./businesses-saga";
import { authSagas } from "./authSagas";

export default function* rootSaga() {
  yield all([call(authSagas), classSagas(), businessesSagas()]);
}
