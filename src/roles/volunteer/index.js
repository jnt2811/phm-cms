import { Route, Switch } from "react-router-dom";
import pathNames from "../../router/pathNames";
import Dashboard from "./pages/Dashboard";

const Volunteer = () => {
  return (
    <div className="volunteer">
      <h1>Volunteer</h1>

      <Switch>
        <Route exact path={pathNames.VOLUNTEER} component={Dashboard} />
      </Switch>
    </div>
  );
};

export default Volunteer;
