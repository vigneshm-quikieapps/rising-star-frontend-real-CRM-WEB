import { CREATE_TERM_SAGA, DELETE_TERM_SAGA, EDIT_TERM_SAGA, GET_TERM_SAGA, UPDATE_TERM_SAGA } from "../types";

export const GetTerm = (id) => {
  console.log("GetTerm",id);
  return { type: GET_TERM_SAGA, payload: id };
};
export const CreateTerm = (label,startDate,endDate,id) =>{
  console.log("CreateTeam",id);
  return { type: CREATE_TERM_SAGA, payload: {label:label,startDate:startDate,endDate:endDate,id:id} };
}
export const EditTerm = (value,index,Termlist,key) =>{
  console.log("EditTerm",value);
  return { type: EDIT_TERM_SAGA, payload: {value:value,index:index,Termlist:Termlist,key:key} };
}
export const UpdateTerm = (id,value) => {
  console.log("updateTerm");
  return { type: UPDATE_TERM_SAGA, payload: {id:id,value:value} };
};

export const RemoveTerm = (id) => {
  console.log("removeTerm");
  return { type: DELETE_TERM_SAGA, payload: id };
};
export default {
  GetTerm,
  CreateTerm,
  EditTerm,
  UpdateTerm,
  RemoveTerm,
};
