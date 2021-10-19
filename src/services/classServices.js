// import axios from "axios";
import axiosInstance from "../utils/axiosInstance";
import API from "../helper/config";

export default async function fetchGetClass(id) {
  try {
    const response = await axiosInstance.get(
      API.GetBusinessClassListAPI + id + "/classes"
    );
    const classes = response.data.docs;
    console.log(response);
    return classes;
  } catch (error) {
    console.log(error);
  }
}
