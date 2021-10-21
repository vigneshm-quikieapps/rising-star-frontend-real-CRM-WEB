import axios from "axios";
import API from "../helper/config";

export const axiosGetMembersEnrolledInASession = async (id) => {
  const api = `${API.SessionsAPI}${id}/members`;
  try {
    const allMembers = await axios.get(api);
    return allMembers.data;
  } catch (error) {
    console.error(error);
  }
};
