import axiosInstance from "../utils/axios-instance";

export async function getBusinesses() {
  try {
    const response = await axiosInstance.get("/businesses");
    const businessList = response.data.docs;
    console.log(businessList);
    return businessList;
  } catch (error) {
    throw error;
  }
}
