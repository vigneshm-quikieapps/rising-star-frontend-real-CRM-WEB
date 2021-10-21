import axios from "axios";
import API from "../helper/config";

export async function fetchGetTerm(id) {
    try {
        const response = await axios({
            method: "GET",
            url: API.GetBusinessTerm + id +'/terms',
        });
        console.log("_response", response);
        return response.data.docs
    } catch (error) {
        throw error;
    }
  }
  export async function fetchCreateTerm(payload) {
      console.log(payload);
      let value = {
        "business" : payload.id,
        "code" : "354",
        "label" : payload.label,
        "startdate": payload.startDate,
        "enddate" : payload.endDate,
        "classsequence": 1,
        "updatedBy" : "6144750a44b01da23b80d107",
        "createdBy" : "6144750a44b01da23b80d107"
        }
    try {
        const response = await axios({
            method: "POST",
            data:value,
            url: API.CreateTeamAPI,
        });
        console.log("_response", response);
        return response.data.docs
    } catch (error) {
        throw error;
    }
  }
export async function fetchUpdateTerm(payload) {
    console.log("__",payload.value)
    let value={
        label:payload.value.label,
        startDate:payload.value.startDate,
        endDate:payload.value.endDate
    }
    try {
        const response = await axios({
            method: "PUT",
            data:value,
            url: API.UpdateDeleteTermAPI + payload.id,
        });
        console.log("_response", response);
    } catch (error) {
        throw error;
    }
  }


export async function fetchDeleteTerm(id) {
    try {
        const response = await axios({
            method: "DELETE",
            url: API.UpdateDeleteTermAPI + id,
        });
        console.log("_response", response);
    } catch (error) {
        throw error;
    }
  }
