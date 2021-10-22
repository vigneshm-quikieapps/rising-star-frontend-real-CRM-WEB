import API from "../helper/config";

export default function fetchGetClass(id) {
  return fetch(API.GetBusinessClassListAPI+id+'/classes', {
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
