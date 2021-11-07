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

export const getMemberById = async (id) => {
  try {
    const api = `members/${id}`;
    const response = await axiosInstance.get(api);
    return response.data.member;
  } catch (error) {
    throw error;
  }
};

export const axiosGetConsentByClubmembership = async (id) => {
  try {
    const api = `member-consents/by-club-membership-id/${id}`;
    const consent = await axiosInstance.get(api);
    return consent.data.memberConsent;
  } catch (error) {
    throw error;
  }
};

export const getMemberListOfSession = async ({ sessionId, params }) => {
  try {
    const api = `sessions/${sessionId}/members`;
    const members = await axiosInstance.get(api, { params });
    return members.data;
  } catch (error) {
    throw error;
  }
};
