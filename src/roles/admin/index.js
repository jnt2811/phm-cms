import { Affix, Col, Row } from "antd";
import { Route, Switch } from "react-router-dom";
import pathNames from "../../router/pathNames";
import Dashboard from "./pages/dashboard/Dashboard";
import AdminSider from "./layouts/sider/AdminSider";
import AdminHeader from "./layouts/header/AdminHeader";

const Admin = () => {
  return (
    <div className="admin">
      <Row>
        <Col flex="250px">
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
            </Switch>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default Admin;
