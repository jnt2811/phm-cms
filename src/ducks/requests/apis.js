const localhost = "http://localhost:3000";
const deploy = "https://nha-cho-thu-cung.herokuapp.com";

const switcher = false;

const apiUrl = switcher ? localhost : deploy;

const apis = {
  LOGIN: apiUrl + "/login",
  VOLUNTEER: apiUrl + "/volunteer",
  VOLUNTEER_SEARCH: apiUrl + "/volunteer/search",
  SCHEDULE: apiUrl + "/schedule",
  SCHEDULE_UPDATE: apiUrl + "/volunteer/schedule",
  PET: apiUrl + "/pet",
  PET_SEARCH: apiUrl + "/pet/search",
  DONATION: apiUrl + "/donation",
  DONATION_SEARCH: apiUrl + "/donation/search",
  DONATOR: apiUrl + "/donation/donator",
  DONATOR_SEARCH: apiUrl + "/donation/donator/search",
  CLINIC: apiUrl + "/clinic",
  CLINIS_SEARCH: apiUrl + "/clinic/search",
  APPOINTMENT: apiUrl + "/appointment",
  REPORT: apiUrl + "/report",
};

export default apis;
