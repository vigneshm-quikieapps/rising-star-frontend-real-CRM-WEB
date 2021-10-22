export const baseDomain = "https://ismart-rising-star.herokuapp.com/";
export const API_URL = baseDomain + "api/";

const API = {
  GetBusinessClassListAPI: API_URL + "businesses/",
  MembersAPI: API_URL + "members/",
  SessionsAPI: API_URL + "sessions/",
  ClassesAPI: API_URL + "classes/",
  EnrolmentsAPI: API_URL + "enrolments/",
};

export default API;
