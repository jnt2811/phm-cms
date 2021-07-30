import { httpRequestGet, httpRequestPost } from "./httpRequest";
import apis from "./apis";

export const requestGetAllDonations = () => {
  return httpRequestGet(apis.DONATION);
};

export const requestCreateDonation = (requestData) => {
  return httpRequestPost(apis.DONATION, requestData);
};
