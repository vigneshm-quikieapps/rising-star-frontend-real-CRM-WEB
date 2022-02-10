import axios from "axios";

const axiosInstance = axios.create({
  baseURL: process.env.REACT_APP_API_URL,
  withCredentials: process.env.NODE_ENV === "production" ? true : false,
});

axiosInstance.interceptors.request.use(
  (config) => {
    const accessToken = localStorage.getItem("accessToken");
    config.headers = {
      Authorization: `Bearer ${accessToken}`,
    };
    return config;
  },
  function (error) {
    // Do something with request error
    return Promise.reject(error);
  },
);
export const setupInterceptors = (logout) => {
  axiosInstance.interceptors.response.use(
    (response) => {
      return response;
    },
    (error) => {
      if (error?.response?.status === 401) {
        if (error.config.url === "refresh-token") {
          logout();
          return Promise.reject(error);
        }
        axiosInstance
          .post("refresh-token")
          .then((response) => {
            const accessToken = response.data.accessToken;
            localStorage.setItem("accessToken", accessToken);
            const { config } = error;
            config.headers = { Authorization: `Bearer ${accessToken}` };
            /// is it already set on axios instance?
            // config.withCredentials =
            //   process.env.NODE_ENV === "production" ? true : false;
            return new Promise((resolve) => resolve(axios(config)));
          })
          .catch((error) => Promise.reject(error));
      } else {
        // Do something with response error
        return Promise.reject(error);
      }
    },
  );
};

export default axiosInstance;
