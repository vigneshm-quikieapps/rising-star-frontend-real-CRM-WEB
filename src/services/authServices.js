import axiosInstance from "../utils/axios-instance";

const logIn = async (mobileNo, password) => {
  const response = await axiosInstance.post("/sign-in", {
    mobileNo,
    password,
  });
  const AccessToken = response.data.accessToken;
  localStorage.setItem("accessToken", AccessToken);
};

export default logIn;
