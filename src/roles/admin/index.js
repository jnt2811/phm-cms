import { Affix, Col, Row } from "antd";
import { Route, Switch } from "react-router-dom";
import pathNames from "../../router/pathNames";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminSider from "./layouts/sider/AdminSider";
import AdminHeader from "./layouts/header/AdminHeader";
import Volunteer from "./pages/volunteer/Volunteer";
import Donation from "./pages/donation/Donation";
import Pet from "./pages/pet/Pet";
import Clinic from "./pages/clinic/Clinic";
import { Appointment, Report } from "./pages/examination";
import Chat from "./pages/chat/Chat";
import Account from "./pages/account/Account";
import NotFound from "../../pages/NotFound";
import NewDonation from "./pages/donation/newDonation/NewDonation";
import ViewPet from "./pages/pet/ViewPet";

const Admin = () => {
  return (
    <div className="admin">
      <Row wrap={false}>
        <Col flex="300px">
          <Affix offsetTop={0}>
            <AdminSider />
          </Affix>
        </Col>

        <Col flex="auto">
          <Affix offsetTop={0}>
            <AdminHeader />
          </Affix>

          <div className="container">
            <Switch>
              <Route exact path={pathNames.ADMIN} component={Dashboard} />
              <Route
                exact
                path={pathNames.ADMIN_VOLUNTEER}
                component={Volunteer}
              />
              <Route
                exact
                path={pathNames.ADMIN_DONATION}
                component={Donation}
              />
              <Route
                exact
                path={pathNames.ADMIN_NEW_DONATION}
                component={NewDonation}
              />
              <Route exact path={pathNames.ADMIN_PET} component={Pet} />
              <Route path={pathNames.ADMIN_VIEW_PET_wId} component={ViewPet} />
              <Route exact path={pathNames.ADMIN_CLINIC} component={Clinic} />
              <Route
                exact
                path={pathNames.ADMIN_APPOINTMENT}
                component={Appointment}
              />
              <Route exact path={pathNames.ADMIN_REPORT} component={Report} />
              <Route exact path={pathNames.ADMIN_CHAT} component={Chat} />
              <Route exact path={pathNames.ADMIN_ACCOUNT} component={Account} />

              <Route component={NotFound} />
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
