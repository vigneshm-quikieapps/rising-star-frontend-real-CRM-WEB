import axiosInstance from "../utils/axios-instance";
export const paymentData = async (billDate, classId, businessId, payment) => {
  console.log(
    "classId, billDate, payment",
    billDate,
    classId,
    businessId,
    payment,
  );
  const data = new FormData();
  data.append("billDate", billDate);
  data.append("classId", classId);
  data.append("businessId", businessId);
  data.append("payment", payment);
  try {
    const api = `businesses/${businessId}/xlxsupload`;
    const response = await axiosInstance.post(api, data);
    return response;
  } catch (error) {
    throw error;
  }
};
