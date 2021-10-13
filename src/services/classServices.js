import API from "../helper/config";

export default function fetchGetClass() {
  return fetch(API.GetBusinessClassListAPI, {
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
}
