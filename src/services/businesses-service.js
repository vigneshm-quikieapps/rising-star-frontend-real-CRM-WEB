import axiosInstance from "../utils/axios-instance";

export async function getBusinesses() {
  try {
    const response = await axiosInstance.get("/businesses");
    const businessList = response.data.docs;
    return businessList;
  } catch (error) {
    throw error;
  }
}
export async function getBusinessListOfBusiness() {
  try {
    const response = await axiosInstance.get("/businesses/of-logged-in-user");
    const businessList = response.data;
    return businessList;
  } catch (error) {
    throw error;
  }
}

export async function getCategoryListOfBusiness(id) {
  try {
    const api = `/businesses/${id}/categories`;
    const response = await axiosInstance.get(api);
    const categoryList = response.data;
    return categoryList;
  } catch (error) {
    throw error;
  }
}
