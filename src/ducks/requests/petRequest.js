import {
  httpRequestGet,
  httpRequestPatch,
  httpRequestPost,
} from "./httpRequest";
import apis from "./apis";

export const requestGetAllPets = () => {
  return httpRequestGet(apis.PET);
};

export const requestGetPet = (id) => {
  return httpRequestGet(apis.PET + "/" + id);
};

export const requestCreatePet = (requestData) => {
  return httpRequestPost(apis.PET, requestData);
};

export const requestUpdatePet = (requestData) => {
  return httpRequestPatch(apis.PET + "/" + requestData.id, requestData);
};
