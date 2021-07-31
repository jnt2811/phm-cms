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
  ADMIN_HISTORY: admin + "/examination/history",
  ADMIN_CHAT: admin + "/chat",
  ADMIN_ACCOUNT: admin + "/account",

  // Volunteer
  VOLUNTEER: volunteer,

  // Clinic
  CLINIC: clinic,
};

export default pathNames;
