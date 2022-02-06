import axiosInstance from "../utils/axios-instance";
export const paymentData = async (id, classId, billDate, payment) => {
  console.log("id, classId, billDate, payment", id, classId, billDate, payment);
  try {
    const api = `businesses/${id}/xlxsupload`;
    const response = await axiosInstance.post(api, {
      classId: classId,
      billDate: billDate,
      payment: payment,
    });
    return response;
    console.log("respomse", payment);
  } catch (error) {
    throw error;
  }
};
