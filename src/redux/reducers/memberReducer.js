import { GET_MEMBERS_ENROLLMENT } from "../types";

const INITIAL_STATE = {
  enrolmentList: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_MEMBERS_ENROLLMENT:
      return { ...state, enrolmentList: action.payload };
    default:
      return state;
  }
}
