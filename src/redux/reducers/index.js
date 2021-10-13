import { combineReducers } from "redux";
import classReducers from "./classReducers";

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  classes: classReducers,
});

export default rootReducer;
