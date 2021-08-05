import { httpRequestGet, httpRequestPost } from "./httpRequest";
import apis from "./apis";

export const requestGetAllDonations = () => {
  return httpRequestGet(apis.DONATION);
};

export const requestCreateDonation = (requestData) => {
  return httpRequestPost(apis.DONATION, requestData);
};

export const requestGetAllDonators = () => {
  return httpRequestGet(apis.DONATOR);
};

export const requestSearchDonation = (requestData) => {
  return httpRequestPost(apis.DONATION_SEARCH, requestData);
};

export const requestSearchDonator = (requestData) => {
  return httpRequestPost(apis.DONATOR_SEARCH, requestData);
};
