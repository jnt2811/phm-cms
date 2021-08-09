import { Route, Switch } from "react-router-dom";
import NotFound from "../../pages/NotFound";
import pathNames from "../../router/pathNames";
import ClinicHeader from "./layouts/ClinicHeader";
import Account from "./pages/account/Account";
import Chat from "./pages/chat/Chat";
import Appointment from "./pages/examination/appointment/Appointment";
import NewReport from "./pages/examination/appointment/newReport/NewReport";
import Report from "./pages/examination/report/Report";

const Clinic = () => {
  return (
    <div className="clinic" style={{ minHeight: "100vh" }}>
      <ClinicHeader />

      <div className="container">
        <Switch>
          <Route exact path={pathNames.CLINIC} component={Account} />
          <Route
            exact
            path={pathNames.CLINIC_APPOINTMENT}
            component={Appointment}
          />
          <Route exact path={pathNames.CLINIC_REPORT} component={Report} />
          <Route
            exact
            path={pathNames.CLINIC_NEW_REPORT_wId}
            component={NewReport}
          />
          <Route exact path={pathNames.CLINIC_CHAT} component={Chat} />

          <Route component={NotFound} />
        </Switch>
      </div>
    </div>
  );
};

export default Clinic;
