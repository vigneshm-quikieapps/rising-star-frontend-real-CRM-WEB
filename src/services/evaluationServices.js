import axiosInstance from "../utils/axios-instance";

export async function getAllEvaluationScheme() {
  try {
    const response = await axiosInstance.get("/evaluations");
    const evaluationSchemeList = response.data.docs;
    return evaluationSchemeList;
  } catch (error) {
    throw error;
  }
}
