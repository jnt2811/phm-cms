import {
  httpRequestGet,
  httpRequestPatch,
  httpRequestPost,
} from "./httpRequest";
import apis from "./apis";

export const requestDoLogin = (requestData) => {
  const headers = {};

  return httpRequestPost(apis.LOGIN, requestData, headers);
};

export const requestUpdateUserInfo = (requestData) => {
  return httpRequestPatch(apis.USER + "/" + requestData.id, requestData);
};

export const requestGetUserInfo = (id) => {
  return httpRequestGet(apis.USER + "/" + id);
};
