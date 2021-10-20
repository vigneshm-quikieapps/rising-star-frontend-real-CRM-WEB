import axiosInstance from "../utils/axios-instance";

export default async function getClasses(businessId) {
  try {
    const response = await axiosInstance.get(
      "/businesses/" + businessId + "/classes"
    );
    const classes = response.data.docs;
    return classes;
  } catch (error) {
    throw error;
  }
}
