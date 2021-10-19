import { all } from "@redux-saga/core/effects";
import { watchGetClassList } from "./classSagas";
import { watchGetMember, watchGetMemberList } from "./memberSagas";

export default function* rootSaga() {
  yield all([watchGetClassList(), watchGetMemberList(), watchGetMember()]);
}
