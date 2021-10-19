import axios from "axios";

const axiosInstance = axios.create({
  baseURL: "https://ismart-rising-star.herokuapp.com/api",
  headers: {},
});

export default axiosInstance;
