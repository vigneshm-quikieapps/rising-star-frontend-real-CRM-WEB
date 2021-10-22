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
        businessId:payload.id,
        code:144755,
        label:payload.label,
        startdate:payload.startDate,
        enddate:payload.endDate,
        classsequence:1541,
        
    
    }
    console.log(value);
    try {
        const response = await axios({
            method: "POST",
            data:value,
            url: API.CreateUpdateDeleteTermAPI,
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
            url: API.CreateUpdateDeleteTermAPI + payload.id,
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
            url: API.CreateUpdateDeleteTermAPI + id,
        });
        console.log("_response", response);
    } catch (error) {
        throw error;
    }
  }
