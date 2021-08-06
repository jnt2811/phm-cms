import { httpRequestPatch, httpRequestPost } from "./httpRequest";
import apis from "./apis";

export const requestDoLogin = (requestData) => {
  const headers = {};

  return httpRequestPost(apis.LOGIN, requestData, headers);
};

export const requestDoUpdateUserPass = (requestData) => {
  return httpRequestPatch(apis.USER + "/" + requestData.id, requestData);
};
