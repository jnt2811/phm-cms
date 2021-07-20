import { Route, Switch } from "react-router-dom";
import pathNames from "../../router/pathNames";
import Dashboard from "./pages/Dashboard";

const Admin = () => {
  return (
    <div className="admin">
      <h1>Admin</h1>

      <Switch>
        <Route exact path={pathNames.ADMIN} component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Admin;
