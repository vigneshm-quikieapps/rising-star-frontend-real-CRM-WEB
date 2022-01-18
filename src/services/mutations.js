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

const deleteTransaction = (data) => axios.post("bills/delete-transaction", data);

export const useDeleteTransaction = (options) =>
  useMutation((data) => deleteTransaction(data), options);

const updateTransactions = (data) => axios.post("bills/update-transactions", data);

export const useUpdateTransaction = (options) =>
  useMutation((data) => updateTransactions(data), options);
