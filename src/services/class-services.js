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
