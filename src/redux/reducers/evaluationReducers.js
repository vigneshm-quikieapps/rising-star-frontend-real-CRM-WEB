import { evaluationsActionTypes } from "../types";

const initialState = {
  evaluationList: [],
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case evaluationsActionTypes.GET_EVALUATION_SCHEME_SUCCEEDED:
      return { ...state, evaluationList: action.payload };
    default:
      return state;
  }
}
