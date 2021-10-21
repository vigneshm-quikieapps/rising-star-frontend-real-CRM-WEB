import { all, call } from "@redux-saga/core/effects";
import { watchGetClassList } from "./classSagas";
import { authSagas } from "./authSagas";
import { watchgetAllErolmentOfAMember } from "./memberSagas";

export default function* rootSaga() {
  yield all([
    // call(authSagas),
    // watchGetClassList,
    watchgetAllErolmentOfAMember(),
  ]);
}
