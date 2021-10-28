import { evaluationsActionTypes } from "../types";

const initialState = {
  evaluationList: [],
  error: "",
  loading: true,
};

export default function reducer(state = initialState, action) {
  switch (action.type) {
    case evaluationsActionTypes.GET_EVALUATION_SCHEME:
      return { ...state, evaluationList: action.payload, loading: false };
    case evaluationsActionTypes.GET_EVALUATION_SCHEME_FAILED:
      return { ...state, error: action.payload, loading: false };
    default:
      return state;
  }
}
