import axios from "axios";
import API from "../helper/config";

export async function fetchGetClass(id) {
  console.log("gggg");
 
  try {
    const token =
    "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJfaWQiOiI2MTQxOWQxMmEwZDVjZTAyYmQxODdhNmMiLCJyb2xlcyI6W3siaWQiOiI2MTQzMjRjNjg1N2M1OGYzNzNiYTBkZDYiLCJuYW1lIjoiQnVzaW5lc3MgQURNSU4ifV0sImRhdGFQcml2aWxlZ2VzIjpbeyJfaWQiOiI2MTZmZGNlZmQ2ZGIzNjE0YzFmOTM3ZGUiLCJ0eXBlIjoiTElTVCIsImJ1c2luZXNzSWQiOiI2MTRhZTBmOWMyNjU2MzBjZDUyMGFiMzYifV0sImlhdCI6MTYzNDcyMTAwNywiZXhwIjoxNjM1MzI1ODA3fQ.K0jOeysy8_bsgSTaY4boYlnDWacW0kAyF7bvrVzpqAE";
    const response = await axios({
      method: "GET",
      url: "https://ismart-rising-star.herokuapp.com/api/auth/user/classes",
      headers: {   
        "content-type":"application/json" ,
        Authorization:`Bearer ${token}`,
      },
    });
    console.log("_response", response.data.docs);
    return response.data.docs;
  } catch (error) {
    throw error;
  }
}
