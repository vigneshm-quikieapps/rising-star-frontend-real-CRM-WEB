import axiosInstance from "../utils/axios-instance";

export const axiosGetAllTerms = async () => {
  try {
    const api = `terms/`;
    const allTerms = await axiosInstance.get(api);
    return allTerms.data;
  } catch (error) {
    throw error;
  }
};

export const axiosGetSessionsByTermId = async (id) => {
  try {
    const api = `terms/${id}/sessions`;
    const allSessions = await axiosInstance.get(api);
    return allSessions.data;
  } catch (error) {
    throw error;
  }
};

export const getTermsOfBusiness = async (businessId) => {
  try {
    const response = await axiosInstance.get(`businesses/${businessId}/terms`);
    const data = response.data;
    return data;
  } catch (error) {
    throw error;
  }
};

export const addTerm = async ({ businessId, label, startDate, endDate }) => {
  try {
    const response = await axiosInstance.post("terms", {
      businessId,
      label,
      startDate,
      endDate,
    });
    const newTerm = response.data;
    return newTerm;
  } catch (error) {
    throw error;
  }
};

export const editTerm = async ({ id, label, startDate, endDate }) => {
  try {
    await axiosInstance.put(`terms/${id}`, { label, startDate, endDate });
    return { id, label, startDate, endDate };
  } catch (error) {
    throw error;
  }
};
