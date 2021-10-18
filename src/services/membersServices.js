import axios from "axios";
import API from "../helper/config";

export const getAllMembers = async (callback) => {
  try {
    const allMembers = await axios.get(API.MembersAPI);
    callback && callback(allMembers.data);
  } catch (error) {
    console.error(error);
  }
};

export const getMemberById = async (id, callback) => {
  try {
    const member = await axios.get(`${API.MembersAPI}${id}`);
    callback && callback(member.data);
  } catch (error) {
    console.error(error);
  }
};
