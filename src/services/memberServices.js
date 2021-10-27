import axiosInstance from "../utils/axios-instance";

export const fetchgetAllErolmentOfAMember = async (params) => {
  const api = `enrolments/of-a-member-in-a-business`;
  const response = await axiosInstance.post(api, params);
  return response.data.docs;
};

export const fetchgetProgresRecordOfAMember = async (params) => {
  const api = `progress`;
  const response = await axiosInstance.post(api, params);
  return response.data.progress;
};

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

export const axiosmemberDropped = async (id) => {
  try {
    const api = `enrolments/${id}/withdraw`;
    const Response = await axiosInstance.get(api);
    return Response;
  } catch (error) {
    throw error;
  }
};

export const axiosmemberSuspend = async (id) => {
  try {
    const api = `enrolments/${id}/suspend`;
    const Response = await axiosInstance.get(api);
    return Response;
  } catch (error) {
    throw error;
  }
};

export const axiosmemberReturnFromSuspend = async (id) => {
  try {
    const api = `enrolments/${id}/return-from-suspension`;
    const Response = await axiosInstance.get(api);
    return Response;
  } catch (error) {
    throw error;
  }
};
