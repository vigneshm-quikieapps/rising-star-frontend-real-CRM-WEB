import API from "../helper/config";

export default fetchGetClass = () => {
  return fetch(API.GetBussinessClassListAPI, {
    method: "GET",
    headers: {
      Accept: "application/json",
      "Content-Type": "application/json",
    },
  })
    .then((response) => response.json())
    .catch((error) => {
      throw error;
    });
};
