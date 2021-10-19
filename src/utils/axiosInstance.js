import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ismart-rising-star.herokuapp.com/api",
  withCredentials: true,
});

axiosInstance.interceptors.request.use((config) => {
  const accessToken = localStorage.getItem("accessToken");
  config.headers = {
    Authorization: `Bearer ${accessToken}`,
  };
  return config;
});

axiosInstance.interceptors.response.use(
  (response) => {
    return response;
  },
  (error) => {
    if (error.response.status === 401) {
      axiosInstance
        .post("/refresh-token")
        .then((response) => {
          const accessToken = response.data.accessToken;
          localStorage.setItem("accessToken", accessToken);
          const { config } = error;
          config.headers = { Authorization: `Bearer ${accessToken}` };
          config.withCredentials = true;
          return new Promise((resolve) => resolve(axios(config)));
        })
        .catch((error) => {
          throw error;
        });
    }
  }
);

export default axiosInstance;

