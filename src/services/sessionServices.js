import axiosInstance from "../utils/axios-instance";

export const axiosGetMembersEnrolledInASession = async (id) => {
  try {
    const api = `sessions/${id}/members`;
    const allMembers = await axiosInstance.get(api);
    return allMembers.data;
  } catch (error) {
    throw error;
  }
};

export const axiosGetSessionInAclassByTermId = async (params) => {
  try {
    const api = `sessions/in-a-class/of-a-particular-term`;
    const allMembers = await axiosInstance.get(api, params);
    return allMembers.data;
  } catch (error) {
    throw error;
  }
};
