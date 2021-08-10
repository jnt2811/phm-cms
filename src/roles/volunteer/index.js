import { Route, Switch } from "react-router-dom";
import pathNames from "../../router/pathNames";
import VolunteerHeader from "./layouts/VolunteerHeader";
import Account from "./pages/account/Account";
import Pet from "./pages/pet/Pet";
import ViewPet from "./pages/pet/ViewPet";
import Appointment from "./pages/appointment/Appointment";
import NotFound from "../../pages/NotFound";
import Chat from "../../pages/chat/Chat";

const Volunteer = () => {
  return (
    <div className="volunteer" style={{ minHeight: "100vh" }}>
      <VolunteerHeader />

      <div className="container">
        <Switch>
          <Route exact path={pathNames.VOLUNTEER} component={Account} />
          <Route exact path={pathNames.VOLUNTEER_PET} component={Pet} />
          <Route path={pathNames.VOLUNTEER_PET_wId} component={ViewPet} />
          <Route
            exact
            path={pathNames.VOLUNTEER_APPOINTMENT}
            component={Appointment}
          />
          <Route exact path={pathNames.VOLUNTEER_CHAT} component={Chat} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default Volunteer;
