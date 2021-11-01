import axiosInstance from "../utils/axios-instance";

export async function getClasses(params) {
  try {
    const response = await axiosInstance.get("classes/of-logged-in-user", {
      params,
    });
    const { docs: classList, totalPages, page: currentPage } = response.data;
    return { classList, totalPages, currentPage };
  } catch (error) {
    throw error;
  }
}

export async function deleteClassByID(id) {
  try {
    await axiosInstance.delete("/classes/" + id);
    return id;
  } catch (error) {
    throw error;
  }
}

export async function axiosGetClassById(id) {
  try {
    const api = `classes/${id}`;
    const res = await axiosInstance.get(api);
    return res.data.businessClass;
  } catch (error) {
    throw error;
  }
}

export async function addNewClass(data) {
  try {
    const api = `classes`;
    const response = await axiosInstance.post(api, data);
    const res = response.data;
    return res;
  } catch (error) {
    throw error;
  }
}

export async function getTermsListOfClass(id) {
  try {
    const api = `classes/${id}/terms`;
    const res = await axiosInstance.get(api);
    return res.data;
  } catch (error) {
    throw error;
  }
}
