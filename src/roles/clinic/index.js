import { Route, Switch } from "react-router-dom";
import pathNames from "../../router/pathNames";
import Dashboard from "./pages/Dashboard";

const Clinic = () => {
  return (
    <div className="clinic">
      <h1>Clinic</h1>

      <Switch>
        <Route exact path={pathNames.CLINIC} component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Clinic;
