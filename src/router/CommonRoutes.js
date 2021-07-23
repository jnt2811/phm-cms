import { Redirect, Route } from "react-router-dom";
import { localKeys } from "../constances";
import pathNames from "../router/pathNames";
import NotAccess from "../pages/NotAccess";

export const PublicRoute = ({ component: Component, ...remainingProps }) => {
  const isAuth = localStorage.getItem(localKeys.ACCESS_TOKEN) !== null;
  const isAdmin = localStorage.getItem(localKeys.ROLE) === "admin";
  const isVolunteer = localStorage.getItem(localKeys.ROLE) === "volunteer";
  const isClinic = localStorage.getItem(localKeys.ROLE) === "clinic";

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
  const isAdmin = localStorage.getItem(localKeys.ROLE) === "admin";

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
  const isVolunteer = localStorage.getItem(localKeys.ROLE) === "volunteer";

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
  const isClinic = localStorage.getItem(localKeys.ROLE) === "clinic";

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
