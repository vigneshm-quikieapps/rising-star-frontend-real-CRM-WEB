import { LoginActionTypes } from "../types";

export const logInStart = (credentials) => ({
  type: LoginActionTypes.LOG_IN_START,
  payload: credentials,
});

export const logInSuccess = (user) => ({
  type: LoginActionTypes.LOG_IN_SUCCESS,
  payload: user,
});

export const logout = () => ({
  type: LoginActionTypes.LOG_OUT,
});
