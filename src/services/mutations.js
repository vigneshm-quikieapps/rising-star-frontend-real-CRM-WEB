import { useMutation } from "react-query";

import axios from "../utils/axios-instance";

const login = (data) => axios.post("sign-in", data).then(({ data }) => data);
export const useLoginMutation = (options) =>
  useMutation((data) => login(data), options);

const logout = () => axios.post("logout");
export const useLogoutMutation = (options) =>
  useMutation(() => logout(), options);
