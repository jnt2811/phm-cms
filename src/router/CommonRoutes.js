import { Redirect, Route } from "react-router-dom";
import localKeys from "../constances/localKeys";
import pathNames from "../router/pathNames";
import NotAccess from "../pages/NotAccess";

const ROLE_ADMIN = "Quản trị viên";
const ROLE_VOLUNTEER = "Tình nguyện viên";
const ROLE_CLINIC = "Phòng khám";

export const PublicRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localStorage.getItem(localKeys.ACCESS_TOKEN) !== null;
  const isAdmin = localStorage.getItem(localKeys.USER_DATA)
    ? JSON.parse(localStorage.getItem(localKeys.USER_DATA)).rest.role ===
      ROLE_ADMIN
    : false;
  const isVolunteer = localStorage.getItem(localKeys.USER_DATA)
    ? JSON.parse(localStorage.getItem(localKeys.USER_DATA)).rest.role ===
      ROLE_VOLUNTEER
    : false;
  const isClinic = localStorage.getItem(localKeys.USER_DATA)
    ? JSON.parse(localStorage.getItem(localKeys.USER_DATA)).rest.role ===
      ROLE_CLINIC
    : false;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth && isAdmin ? (
          <Redirect to={pathNames.ADMIN} />
        ) : isAuth && isVolunteer ? (
          <Redirect to={pathNames.VOLUNTEER} />
        ) : isAuth && isClinic ? (
          <Redirect to={pathNames.CLINIC} />
        ) : (
          <Component {...props} />
        );
      }}
    />
  );
};

export const AdminRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localStorage.getItem(localKeys.ACCESS_TOKEN) !== null;
  const isAdmin = localStorage.getItem(localKeys.USER_DATA)
    ? JSON.parse(localStorage.getItem(localKeys.USER_DATA)).rest.role ===
      ROLE_ADMIN
    : false;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth && isAdmin ? (
          <Component {...props} />
        ) : isAuth ? (
          <NotAccess />
        ) : (
          <Redirect to={pathNames.MAIN} />
        );
      }}
    />
  );
};

export const VolunteerRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localStorage.getItem(localKeys.ACCESS_TOKEN) !== null;
  const isVolunteer = localStorage.getItem(localKeys.USER_DATA)
    ? JSON.parse(localStorage.getItem(localKeys.USER_DATA)).rest.role ===
      ROLE_VOLUNTEER
    : false;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth && isVolunteer ? (
          <Component {...props} />
        ) : isAuth ? (
          <NotAccess />
        ) : (
          <Redirect to={pathNames.MAIN} />
        );
      }}
    />
  );
};

export const ClinicRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localStorage.getItem(localKeys.ACCESS_TOKEN) !== null;
  const isClinic = localStorage.getItem(localKeys.USER_DATA)
    ? JSON.parse(localStorage.getItem(localKeys.USER_DATA)).rest.role ===
      ROLE_CLINIC
    : false;

  return (
    <Route
      {...remainingProps}
      render={(props) => {
        return isAuth && isClinic ? (
          <Component {...props} />
        ) : isAuth ? (
          <NotAccess />
        ) : (
          <Redirect to={pathNames.MAIN} />
        );
      }}
    />
  );
};
