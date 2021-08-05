import { Button, Col, Row } from "antd";
import { Link, withRouter } from "react-router-dom";
import pathNames from "../../../../../router/pathNames";
import { useState } from "react";
import NewAppointment from "./NewAppointment";

const ExaminationHeader = ({ location }) => {
  const { pathname } = location;

  const isAtAppointment = pathname === pathNames.ADMIN_APPOINTMENT;
  const isAtReport = pathname === pathNames.ADMIN_REPORT;

  const [visibleModal, setVisibleModal] = useState();

  return (
    <div className="examination-header">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Khám bệnh</h1>
        </Col>

        <Col>
          <Button onClick={() => setVisibleModal(true)}>
            Tạo mới lịch hẹn
          </Button>
        </Col>
      </Row>

      <br />

      <Row align="middle" gutter={{ lg: 10 }} className="nav-bar">
        <Col>
          <Link to={pathNames.ADMIN_APPOINTMENT}>
            <Button className={"nav-item " + (isAtAppointment && "active")}>
              Danh sách lịch hẹn
            </Button>
          </Link>
        </Col>

        <Col>
          <Link to={pathNames.ADMIN_REPORT}>
            <Button className={"nav-item " + (isAtReport && "active")}>
              Lịch sử khám bệnh
            </Button>
          </Link>
        </Col>
      </Row>

      <br />
      <br />

      <NewAppointment visible={visibleModal} setVisible={setVisibleModal} />
    </div>
  );
};

export default withRouter(ExaminationHeader);
