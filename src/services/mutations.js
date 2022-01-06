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
