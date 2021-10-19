import { all } from "@redux-saga/core/effects";
import { classListSaga } from "./classSagas";

export default function* rootSaga() {
  yield all([classListSaga]);
}
