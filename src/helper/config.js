export const BASE_DOMAIN = "https://ismart-rising-star.herokuapp.com/";
export const BASE_URL = BASE_DOMAIN + "api/";

const API = {
  GetAllBusinessClassListAPI: BASE_URL + "auth/user/classes",
  GetBusinessTerm: BASE_URL + "businesses/",
  CreateTeamAPI: BASE_URL + "terms",
  UpdateDeleteTermAPI: BASE_URL + "terms/",
};

export default API;
