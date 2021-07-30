import { httpRequestGet, httpRequestPost } from "./httpRequest";
import apis from "./apis";

export const requestGetAllPets = () => {
  return httpRequestGet(apis.PET);
};

export const requestCreatePet = (requestData) => {
  return httpRequestPost(apis.PET, requestData);
};
