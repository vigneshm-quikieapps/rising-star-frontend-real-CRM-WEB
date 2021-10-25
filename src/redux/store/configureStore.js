import { createStore, applyMiddleware } from "redux";
import { composeWithDevTools } from "redux-devtools-extension";
import createSagaMiddleware from "@redux-saga/core";
import rootReducer from "../reducers";
import rootSaga from "../sagas";

const SagaMiddleware = createSagaMiddleware();
const middleware = [SagaMiddleware];

const store = createStore(
  rootReducer,
  composeWithDevTools(applyMiddleware(...middleware))
  // +window.__REDUX_DEVTOOLS_EXTENSION__ && window.__REDUX_DEVTOOLS_EXTENSION__()
);

SagaMiddleware.run(rootSaga);

export default store;
