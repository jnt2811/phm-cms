import { httpRequestPost } from "./httpRequest";
import apis from "./apis";

export const requestDoLogin = (requestData) => {
  const headers = {};

  return httpRequestPost(apis.LOGIN, requestData, headers);
};
