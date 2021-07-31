import {
  httpRequestGet,
  httpRequestPatch,
  httpRequestPost,
} from "./httpRequest";
import apis from "./apis";

export const requestGetAllClinics = () => {
  return httpRequestGet(apis.CLINIC);
};

export const requestCreateClinic = (requestData) => {
  return httpRequestPost(apis.CLINIC, requestData);
};

export const requestUpdateClinic = (requestData) => {
  return httpRequestPatch(apis.CLINIC + "/" + requestData.id, requestData);
};
