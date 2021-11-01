import axiosInstance from "../utils/axios-instance";

export const transferEnrolment = async (data) => {
  try {
    const response = await axiosInstance.post("enrolments/transfer", data);
    return response.data;
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
