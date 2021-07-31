import apis from "./apis";
import { httpRequestGet, httpRequestPost } from "./httpRequest";

export const requestGetAllReports = () => {
  return httpRequestGet(apis.REPORT);
};

export const requestCreateReport = (requestData) => {
  return httpRequestPost(apis.REPORT, requestData);
};
