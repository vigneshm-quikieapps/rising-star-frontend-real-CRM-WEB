import axiosInstance from "../utils/axios-instance";

export const fetchgetAllErolmentOfAMember = async (params) => {
  try {
    const api = `enrolments/of-a-member-in-a-business`;
    const response = await axiosInstance.post(api, params);
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};

export const fetchgetProgresRecordOfAMember = async (params) => {
  try {
    const api = `progress`;
    const response = await axiosInstance.post(api, params);
    return response.data.progress;
  } catch (error) {
    throw error;
  }
};

export const updateMulitpleStatusOnProgresRecordOfAMember = async (params) => {
  try {
    const api = `progress/update-multiple-status`;
    const response = await axiosInstance.put(api, params);
    return response;
  } catch (error) {
    throw error;
  }
};

export const getMembers = async (params) => {
  try {
    const response = await axiosInstance.get("members/of-a-logged-in-user", {
      params,
    });
    const { docs: memberList, totalPages, page: currentPage } = response.data;
    return { memberList, totalPages, currentPage };
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
    const Response = await axiosInstance.post(api);
    return Response;
  } catch (error) {
    throw error;
  }
};

export const axiosmemberSuspend = async (id) => {
  try {
    const api = `enrolments/${id}/suspend`;
    const Response = await axiosInstance.post(api);
    return Response;
  } catch (error) {
    throw error;
  }
};

export const axiosmemberReturnFromSuspend = async (id) => {
  try {
    const api = `enrolments/${id}/return-from-suspension`;
    const Response = await axiosInstance.post(api);
    return Response;
  } catch (error) {
    throw error;
  }
};
