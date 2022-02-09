import { useMutation } from "react-query";

import axios from "../utils/axios-instance";

const login = (data) => axios.post("sign-in", data).then(({ data }) => data);
export const useLoginMutation = (options) =>
  useMutation((data) => login(data), options);

const logout = () => axios.post("logout");
export const useLogoutMutation = (options) =>
  useMutation(() => logout(), options);

const addTransaction = (data) => axios.post("bills/enter-transaction", data);

export const useAddTransaction = (options) =>
  useMutation((data) => addTransaction(data), options);

const addEnrolment = (data) => axios.post("enrolments", data);
export const useAddEnrolment = (option) =>
  useMutation((data) => addEnrolment(data), option);

const deleteTransaction = (data) =>
  axios.post("bills/delete-transaction", data);

export const useDeleteTransaction = (options) =>
  useMutation((data) => deleteTransaction(data), options);

const updateTransactions = (data) =>
  axios.post("bills/update-transactions", data);

export const useUpdateTransaction = (options) =>
  useMutation((data) => updateTransactions(data), options);

// const addPayment = (formData) => {
//   console.log("classId,billDate,payment,selectedBusiness", formData);
//   axios.post(
//     `businesses/${selectedBusiness}/xlxsupload`,
//     classId,
//     billDate,
//     payment,
//     selectedBusiness,
//   );
// };
// const addPayment = (id, data) => {
//   console.log("classId,billDate,payment,selectedBusiness", data);
//   axios.post(`businesses/${id}/xlxsupload`, data);
// };
// export const useAddPayment = (option) =>
//   useMutation((data) => addPayment(data), option);
const addPayment = (billDate, classId, businessId, payment) => {
  console.log("formconsole", billDate, classId, businessId, payment);
  const data = new FormData();
  data.append("billDate", billDate);
  data.append("classId", classId);
  data.append("businessId", businessId);
  data.append("payment", payment);
  axios.post(`businesses/${businessId}/xlxsupload`, data);
};
export const useAddPayment = (option) =>
  useMutation((id, data) => addPayment(id, data), option);
