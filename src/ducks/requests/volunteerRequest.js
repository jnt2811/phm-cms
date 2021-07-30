import {
  httpRequestGet,
  httpRequestPatch,
  httpRequestPost,
} from "./httpRequest";
import apis from "./apis";

export const requestGetAllVolunteers = () => {
  return httpRequestGet(apis.VOLUNTEER);
};

export const requestGetVolunteer = (id) => {
  return httpRequestGet(apis.VOLUNTEER + "/" + id);
};

export const requestCreateVolunteer = (requestData) => {
  return httpRequestPost(apis.VOLUNTEER, requestData);
};

export const requestEditVolunteer = (requestData) => {
  return httpRequestPatch(apis.VOLUNTEER + "/" + requestData.id, requestData);
};

export const requestUpdatePassVolunteer = (requestData) => {
  return httpRequestPatch(apis.VOLUNTEER + "/" + requestData.id, requestData);
};

export const requestSwitchCollabVolunteer = (requestData) => {
  return httpRequestPatch(apis.VOLUNTEER + "/" + requestData.id, requestData);
};
