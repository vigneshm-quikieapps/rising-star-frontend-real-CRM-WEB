import { combineReducers } from "redux";
import classReducers from "./classReducers";
import memberReducers from "./memberReducers";

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  classes: classReducers,
  members: memberReducers,
});

export default rootReducer;
