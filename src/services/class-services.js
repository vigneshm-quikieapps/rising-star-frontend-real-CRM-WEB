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
    await axiosInstance.delete("classes/" + id);
    return id;
  } catch (error) {
    throw error;
  }
}

export async function getClassById(id) {
  try {
    const api = `classes/${id}`;
    const res = await axiosInstance.get(api);
    return res.data.businessClass;
  } catch (error) {
    throw error;
  }
}

export async function addNewClass({ data }) {
  try {
    const api = `classes`;
    const response = await axiosInstance.post(api, data);
    const res = response.data;
    return res;
  } catch (error) {
    throw error;
  }
}

export const getClassSessions = async (classId) => {
  try {
    const path = `classes/${classId}/sessions`;
    const response = await axiosInstance.get(path);
    return response.data.docs;
  } catch (error) {
    throw error;
  }
};

export async function updateClass({ data, id }) {
  try {
    const api = `classes/${id}`;
    const response = await axiosInstance.put(api, data);
    const res = response.data;
    return res;
  } catch (error) {
    throw error;
  }
}

export const updateSessionOfClass = async (data) => {
  try {
    const api = `sessions/${data.id}`;
    const session = await axiosInstance.put(api, data);
    return session.data.businessSession;
  } catch (error) {
    throw error;
  }
};

export const addSessionToClass = async (data) => {
  try {
    const api = `sessions`;
    const session = await axiosInstance.post(api, data);
    return session.data.businessSession;
  } catch (error) {
    throw error;
  }
};

export const deleteSessionFromClass = async (id) => {
  try {
    const api = `sessions/${id}`;
    const res = await axiosInstance.delete(api);
    return res.data;
  } catch (error) {
    throw error;
  }
};
