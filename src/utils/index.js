export const objectToArray = (Obj) => {
  let convertedToArray = Object.entries(Obj);
  return convertedToArray;
};

export const removeItemByIndex = (array, index) => {
  let arr = [...array];
  if (index > -1) {
    arr.splice(index, 1);
  }
  return arr;
};

export { default as axios } from "./axios-instance";
export { default as findDesiredDate } from "./find-date";
export { default as toPascal } from "./to-pascal";
export { default as transformError } from "./transformError";
export { default as toLocaleIsoDate } from "./to-locale-iso-date";
