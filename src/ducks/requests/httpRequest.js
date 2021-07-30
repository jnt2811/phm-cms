import axios from "axios";
import localKeys from "../../constances/localKeys";

const initHeaders = {
  Authorization: "bearer " + localStorage.getItem(localKeys.ACCESS_TOKEN),
};

export const httpRequestPost = async (api, data, headers = initHeaders) => {
  try {
    return axios.post(api, data, { headers: headers }, { timeout: 5000 });
  } catch (error) {
    console.log("POST request error: " + JSON.stringify(error));
  }
};

export const httpRequestGet = async (api, headers = initHeaders) => {
  try {
    return axios.get(api, { headers: headers }, { timeout: 5000 });
  } catch (error) {
    console.log("GET request error: " + JSON.stringify(error));
  }
};

export const httpRequestPatch = async (api, data, headers = initHeaders) => {
  try {
    return axios.patch(api, data, { headers: headers }, { timeout: 5000 });
  } catch (error) {
    console.log("PATCH request error: " + JSON.stringify(error));
  }
};
