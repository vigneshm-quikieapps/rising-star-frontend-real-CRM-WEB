import transformError from "../../utils/transformError";
import { sharedActionTypes } from "../types";

export const setError = (error, customMessage) => ({
  type: sharedActionTypes.SET_ERROR,
  payload: transformError(error, customMessage),
});

export const removeError = () => ({ type: sharedActionTypes.REMOVE_ERROR });

export const clearErrors = () => ({ type: sharedActionTypes.CLEAR_ERRORS });

export const startLoading = () => ({ type: sharedActionTypes.START_LOADING });

export const stopLoading = () => ({ type: sharedActionTypes.STOP_LOADING });

export const setPageTitle = (title) => ({
  type: sharedActionTypes.SET_PAGE_TITLE,
  payload: title,
});
