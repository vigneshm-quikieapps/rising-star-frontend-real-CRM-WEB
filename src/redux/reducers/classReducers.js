import { GET_CLASS_LIST } from "../types";


const INITIAL_STATE = {
  classList:[]
};

export default (state = INITIAL_STATE, action) => {

  switch (action.type) {
    case GET_CLASS_LIST:
      return {...state, classList: action.payload};
    default:
      return state;
  }
};
