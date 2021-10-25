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
    const termsOfBusiness = response.data.docs;
    return termsOfBusiness;
  } catch (error) {
    throw error;
  }
};
