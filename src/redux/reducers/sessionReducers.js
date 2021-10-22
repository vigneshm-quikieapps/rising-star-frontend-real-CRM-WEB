import { memberActionTypes } from "../types";

const INITIAL_STATE = {
  allMembersEnrolled: [],
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case memberActionTypes.GET_ALL_MEMBERS_ENROLLED_IN_A_SESSION:
      return { ...state, allMembersEnrolled: action.payload };

    default:
      return state;
  }
}
