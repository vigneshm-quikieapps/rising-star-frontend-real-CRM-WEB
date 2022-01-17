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

export async function getDateForDashBoard(payload) {
  try {
    const api = "bills/business-admin-dashboard-bill-info";
    const response = await axiosInstance.post(api, payload);
    let paymentDetails = [];
    let resp = response?.data?.respArr;
    for (let i = 0; i < resp.length; i++) {
      paymentDetails.push({
        name: resp[i].month.toUpperCase(),
        received: resp[i].totalPaidAmount,
        notReceived: resp[i].totalUnPaidAmount,
        paidBills: resp[i].totalPaidBills,
        unPaidBills: resp[i].totalUnPaidBills,
      });
    }
    return paymentDetails;
  } catch (error) {
    throw error;
  }
}
