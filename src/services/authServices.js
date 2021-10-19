import axios from "./axiosIntance";

const logIn = async (mobileNo, password) => {
  const response = await axios.post("/sign-in", {
    mobileNo,
    password,
  });
  const AccessToken = response.data.accessToken;
  localStorage.setItem("accessToken", AccessToken);
};

export default logIn;
