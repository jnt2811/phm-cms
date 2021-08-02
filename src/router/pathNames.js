const admin = "/admin";
const volunteer = "/volunteer";
const clinic = "/clinic";

const pathNames = {
  MAIN: "/",

  // Auth
  LOGIN: "/login",

  // Admin
  ADMIN: admin,
  ADMIN_VOLUNTEER: admin + "/volunteer",
  ADMIN_SCHEDULE: admin + "/schedule",
  ADMIN_DONATION: admin + "/donation",
  ADMIN_NEW_DONATION: admin + "/new-donation",
  ADMIN_PET: admin + "/pet",
  ADMIN_VIEW_PET_wId: admin + "/pet/:id",
  ADMIN_VIEW_PET_nId: admin + "/pet/",
  ADMIN_CLINIC: admin + "/clinic",
  ADMIN_APPOINTMENT: admin + "/examination/appointment",
  ADMIN_REPORT: admin + "/examination/report",
  ADMIN_CHAT: admin + "/chat",
  ADMIN_ACCOUNT: admin + "/account",

  // Volunteer
  VOLUNTEER: volunteer,
  VOLUNTEER_PET: volunteer + "/pet",
  VOLUNTEER_PET_wId: volunteer + "/pet/:id",
  VOLUNTEER_PET_nId: volunteer + "/pet/",
  VOLUNTEER_APPOINTMENT: volunteer + "/appointment",
  VOLUNTEER_CHAT: volunteer + "/chat",

  // Clinic
  CLINIC: clinic,
  CLINIC_APPOINTMENT: clinic + "/appointment",
  CLINIC_REPORT: clinic + "/report",
  CLINIC_CHAT: clinic + "/chat",
};

export default pathNames;
