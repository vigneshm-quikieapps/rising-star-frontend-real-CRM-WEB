import { combineReducers } from "redux";
import classReducers from "./classReducers";
import memberEnrolmentReducers from "./memberReducer";

const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  classes: classReducers,
  memberEnrolment: memberEnrolmentReducers,
});

export default rootReducer;
