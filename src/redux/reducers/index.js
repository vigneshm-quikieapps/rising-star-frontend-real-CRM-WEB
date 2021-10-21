import { combineReducers } from "redux";
import TermReducer from "./termReducers";
import  ClassReducer from "./classReducers"

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  classes: ClassReducer,
  Term: TermReducer
});

export default rootReducer;
