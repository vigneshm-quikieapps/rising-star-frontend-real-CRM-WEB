import { all } from "@redux-saga/core/effects";
import { watchGetClassList } from "./classSagas";
import { watchCreateTerm, watchDeleteTerm, watchEditTerm, watchGetTerm, watchUpdateTerm } from "./termSagas";

export default function* rootSaga() {
  yield all([
    watchGetClassList(),
    watchGetTerm(),
    watchCreateTerm(),
    watchEditTerm(),
    watchUpdateTerm(),
    watchDeleteTerm(),
  ]);
}
