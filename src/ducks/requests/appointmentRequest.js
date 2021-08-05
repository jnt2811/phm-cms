import apis from "./apis";
import {
  httpRequestDelete,
  httpRequestGet,
  httpRequestPost,
} from "./httpRequest";

export const requestGetAllAppointments = () => {
  return httpRequestGet(apis.APPOINTMENT);
};

export const requestCreateAppointment = (requestData) => {
  return httpRequestPost(apis.APPOINTMENT, requestData);
};

export const requestDeleteAppointment = (id) => {
  return httpRequestDelete(apis.APPOINTMENT + "/" + id);
};
