import axiosInstance from "../utils/axios-instance";

export async function getClasses(params) {
  try {
    const response = await axiosInstance.get("/auth/user/classes", { params });
    const classList = response.data.docs;
    const { totalPages, page: currentPage } = response.data;
    return { classList, totalPages, currentPage };
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function deleteClassByID(id) {
  try {
    await axiosInstance.delete("/classes/" + id);
    return id;
  } catch (error) {
    console.log(error);
    throw error;
  }
}

export async function axiosGetClassById(id) {
  try {
    const api = `classes/${id}`;
    const res = await axiosInstance.get(api);
    return res.data;
  } catch (error) {
    console.log(error);
    throw error;
  }
}
