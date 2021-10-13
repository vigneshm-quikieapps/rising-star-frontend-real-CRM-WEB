import { all } from "@redux-saga/core/effects";
import { watchGetClassList } from "./classSagas";

export default function* rootSaga() {
  yield all([watchGetClassList]);
}
