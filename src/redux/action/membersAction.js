// import { GET_ALL_MEMBERS_SAGA} from "../types";
import { memberActionTypes } from "../types";

export const getAllMembersList = () => {
  return { type: memberActionTypes.GET_ALL_MEMBERS_SAGA };
};