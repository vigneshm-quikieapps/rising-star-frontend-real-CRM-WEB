import axiosInstance from "../utils/axios-instance";

const logIn = async (mobileNo, password) => {
  try {
    const response = await axiosInstance.post("/sign-in", {
      mobileNo,
      password,
    });
    const AccessToken = response.data.accessToken;
    const userInfo = response.data.user;
    localStorage.setItem("userId", userInfo._id);
    localStorage.setItem("userName", userInfo.name);
    localStorage.setItem("accessToken", AccessToken);
    return userInfo;
  } catch (error) {
    throw error;
  }
};

export default logIn;
