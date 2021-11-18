import axiosInstance from "../utils/axios-instance";

export const axiosGetAllTerms = async () => {
  try {
    const api = `terms/`;
    const allTerms = await axiosInstance.get(api);
    return allTerms.data.docs;
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

export const getTermsOfBusiness = async ({ businessId, params }) => {
  try {
    const response = await axiosInstance.get(`businesses/${businessId}/terms`, {
      params,
    });
    const data = response.data;
    return { ...data, businessId };
  } catch (error) {
    throw error;
  }
};

export const addTerm = async (data) => {
  try {
    const response = await axiosInstance.post("terms", data);
    const newTerm = response.data.term;
    return newTerm;
  } catch (error) {
    throw error;
  }
};

export const editTerm = async (data) => {
  try {
    await axiosInstance.put(`terms/${data._id}`, data);
    return data;
  } catch (error) {
    throw error;
  }
};

export const deleteTerm = async (termId) => {
  try {
    await axiosInstance.delete(`terms/${termId}`);
    return termId;
  } catch (error) {
    throw error;
  }
};

export async function getTermsListOfClass(id) {
  try {
    const api = `classes/${id}/terms`;
    const res = await axiosInstance.get(api);
    return res.data;
  } catch (error) {
    throw error;
  }
}
