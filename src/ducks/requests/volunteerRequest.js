import {
  httpRequestGet,
  httpRequestPatch,
  httpRequestPost,
} from "./httpRequest";
import apis from "./apis";

export const requestGetAllVolunteers = () => {
  return httpRequestGet(apis.VOLUNTEER);
};

export const requestCreateVolunteer = (requestData) => {
  return httpRequestPost(apis.VOLUNTEER, requestData);
};

export const requestUpdateVolunteer = (requestData) => {
  return httpRequestPatch(apis.VOLUNTEER + "/" + requestData.id, requestData);
};
