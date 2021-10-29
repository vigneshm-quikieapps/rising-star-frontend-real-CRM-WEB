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
    const businessList = response.data.docs;
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

export async function getCoachListOfBusiness(id) {
  try {
    const api = `/businesses/${id}/coaches`;
    const response = await axiosInstance.get(api);
    const categoryList = response.data;
    return categoryList;
  } catch (error) {
    throw error;
  }
}

export async function addClass(data) {
  try {
    const api = `classes`;
    const response = await axiosInstance.post(api, data);
    const res = response.data;
    return res;
  } catch (error) {
    throw error;
  }
}
