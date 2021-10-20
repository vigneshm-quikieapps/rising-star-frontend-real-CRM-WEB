import { all, call } from "@redux-saga/core/effects";
import { classListSaga } from "./class-sagas";
import { authSagas } from "./authSagas";

export default function* rootSaga() {
  yield all([call(authSagas), classListSaga()]);
}
