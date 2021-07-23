import { BrowserRouter, Redirect, Route, Switch } from "react-router-dom";
import Login from "../pages/login/Login";
import NotFound from "../pages/NotFound";
import { Admin, Clinic, Volunteer } from "../roles";
import {
  AdminRoute,
  ClinicRoute,
  PublicRoute,
  VolunteerRoute,
} from "./CommonRoutes";
import pathNames from "./pathNames";

const Router = () => {
  return (
    <BrowserRouter>
      <Switch>
        <PublicRoute path={pathNames.LOGIN} component={Login} />

        <AdminRoute path={pathNames.ADMIN} component={Admin} />
        <VolunteerRoute path={pathNames.VOLUNTEER} component={Volunteer} />
        <ClinicRoute path={pathNames.CLINIC} component={Clinic} />

        <Redirect exact from={pathNames.MAIN} to={pathNames.LOGIN} />

        <Route path="*" component={NotFound} />
      </Switch>
    </BrowserRouter>
  );
};

export default Router;
