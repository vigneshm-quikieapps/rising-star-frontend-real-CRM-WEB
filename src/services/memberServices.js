import axios from "axios";
import API from "../helper/config";

export const fetchgetAllErolmentOfAMember = async (params) => {
  const api = `${API.EnrolmentsAPI}of-a-member-in-a-business`;
  const response = await axios.post(api, params);
  return response.data.docs;
};

/**
 * API is not Ready yet.
 */
// export const fetchgetProgresRecordOfAMember = async (params) => {
//   const api = `${API.EnrolmentsAPI}of-a-member-in-a-business`;
//   const response = await axios.post(api, params);
//   return response;
// };

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
  const api = `${API.MembersAPI}${id}`;
  try {
    const member = await axios.get(api);
    return member.data;
  } catch (error) {
    console.error(error);
  }
};
