import axiosInstance from "../utils/axios-instance";

export async function getClasses(params) {
  try {
    const response = await axiosInstance.get("/auth/user/classes", { params });
    const classList = response.data.docs;
    const { totalPages, page: currentPage } = response.data;
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
