import { combineReducers } from "redux";
import authReducer from "./authReducer";
import classReducer from "./class-reducer";
import businessesReducer from "./businesses-reducer";
import memberReducers from "./memberReducers";
import sessionReducers from "./sessionReducers";
import termsReducers from "./terms-reducers";
import evaluationReducers from "./evaluationReducers";
import sharedReducer from "./shared-reducer";
import billingReducers from "./billingReducers";
import updateBillingReducers from "./updateBillingReducer";


const rootReducer = combineReducers({
  //By defining a field inside the reducers parameter
  user: authReducer,
  classes: classReducer,
  businesses: businessesReducer,
  members: memberReducers,
  sessions: sessionReducers,
  terms: termsReducers,
  evaluation: evaluationReducers,
  shared: sharedReducer,
  billing: billingReducers,
  updateBilling: updateBillingReducers
});

export default rootReducer;
