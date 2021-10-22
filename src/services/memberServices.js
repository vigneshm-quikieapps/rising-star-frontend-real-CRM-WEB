import axiosInstance from "../utils/axios-instance";

export const fetchgetAllErolmentOfAMember = async (params) => {
  const api = `enrolments/of-a-member-in-a-business`;
  const response = await axiosInstance.post(api, params);
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
  try {
    const api = "members/";
    const allMembers = await axiosInstance.get(api);
    return allMembers.data;
  } catch (error) {
    throw error;
  }
};

export const axiosGetMember = async (id) => {
  try {
    const api = `members/${id}`;
    const member = await axiosInstance.get(api);
    return member.data;
  } catch (error) {
    throw error;
  }
};
