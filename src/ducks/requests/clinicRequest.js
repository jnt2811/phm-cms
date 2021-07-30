import {
  httpRequestGet,
  httpRequestPatch,
  httpRequestPost,
} from "./httpRequest";
import apis from "./apis";

export const requestGetAllClinics = () => {
  return httpRequestGet(apis.CLINIC);
};

export const requestGetClinic = (id) => {
  return httpRequestGet(apis.CLINIC + "/" + id);
};

export const requestCreateClinic = (requestData) => {
  return httpRequestPost(apis.CLINIC, requestData);
};

export const requestEditClinic = (requestData) => {
  return httpRequestPatch(apis.CLINIC + "/" + requestData.id, requestData);
};

export const requestUpdatePassClinic = (requestData) => {
  return httpRequestPatch(apis.CLINIC + "/" + requestData.id, requestData);
};

export const requestSwitchCollabClinic = (requestData) => {
  return httpRequestPatch(apis.CLINIC + "/" + requestData.id, requestData);
};
