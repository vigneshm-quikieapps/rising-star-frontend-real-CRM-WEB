import { GET_ALL_MEMBERS, GET_MEMBER_BY_ID } from "../types";

const INITIAL_STATE = {
  allMembers: [],
  currentMember: null,
};

export default function reducer(state = INITIAL_STATE, action) {
  switch (action.type) {
    case GET_ALL_MEMBERS:
      return { ...state, allMembers: action.payload };
    case GET_MEMBER_BY_ID:
      return { ...state, currentMember: action.payload };
    default:
      return state;
  }
}
