import axiosInstance from "../utils/axios-instance";

export async function getPaymentDetailsOfSession(data) {
  try {
    const api = "members/bill-status-in-a-session";
    const response = await axiosInstance.post(api, data);
    return response.data;
  } catch (error) {
    throw error;
  }
}
