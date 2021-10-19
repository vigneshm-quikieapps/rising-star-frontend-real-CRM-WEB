import axios from "axios";
import API from "../helper/config";

export const axiosGetMemberList = async () => {
  const api = API.MembersAPI;
  try {
    const allMembers = await axios.get(api);
    return allMembers.data;
  } catch (error) {
    console.error(error);
  }
};

export const axiosGetMember = async (id) => {
  try {
    const member = await axios.get(`${API.MembersAPI}${id}`);
    return member.data;
  } catch (error) {
    console.error(error);
  }
};
