import axiosInstance from "../utils/axios-instance";

export const axiosGetMembersEnrolledInASession = async (id) => {
  try {
    const api = `sessions/${id}/members`;
    const allMembers = await axiosInstance.get(api);
    return allMembers.data;
  } catch (error) {
    throw error;
  }
};

export const getClassSessionsByTermId = async ({ classId, termId }) => {
  try {
    const api = `sessions/in-a-class/of-a-particular-term`;
    const allMembers = await axiosInstance.post(api, { classId, termId });
    return allMembers.data.docs;
  } catch (error) {
    throw error;
  }
};

export const getAttendanceListOfSessionByDate = async (params) => {
  try {
    const api = `attendance/of-a-session-by-date`;
    const attendanceList = await axiosInstance.post(api, params);
    return attendanceList.data;
  } catch (error) {
    throw error;
  }
};

export const addAttendance = async (params) => {
  try {
    const api = `attendance`;
    const attendance = await axiosInstance.post(api, params);
    return attendance.data;
  } catch (error) {
    throw error;
  }
};
