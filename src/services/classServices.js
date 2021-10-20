import axiosInstance from "../utils/axiosInstance";
import API from "../helper/config";

export default async function fetchGetClasses(businessId) {
  try {
    const response = await axiosInstance.get(
      API.getBusinessClassListAPI + businessId + "/classes"
    );
    const classes = response.data.docs;
    return classes;
  } catch (error) {
    throw error;
  }
}
