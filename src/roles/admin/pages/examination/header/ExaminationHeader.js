import { Button, Col, Row } from "antd";
import { Link, withRouter } from "react-router-dom";
import pathNames from "../../../../../router/pathNames";
import { FormModal } from "../../../../../commons/commonModal/CommonModal";
import { useState } from "react";
import { useForm } from "antd/lib/form/Form";
import NewAppointmentForm from "./NewAppointmentForm";

const ExaminationHeader = ({ location }) => {
  const { pathname } = location;

  const isAtAppointment = pathname === pathNames.ADMIN_APPOINTMENT;
  const isAtHistory = pathname === pathNames.ADMIN_HISTORY;

  const [visibleModal, setVisibleModal] = useState();
  const [validSuccess, setValidSuccess] = useState(false);

  const [form] = useForm();

  const onNewAppointment = () => {
    setValidSuccess(false);
    setVisibleModal(true);
  };

  const onOkNewAppointment = () => {
    form.submit();
    if (validSuccess) {
      console.log(form.getFieldsValue());
      form.resetFields();
      setVisibleModal(false);
    }
  };

  const onCancelNewAppointment = () => {
    form.resetFields();
    setVisibleModal(false);
  };

  return (
    <div className="examination-header">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Khám bệnh</h1>
        </Col>

        <Col>
          <Button onClick={onNewAppointment}>Tạo mới lịch hẹn</Button>
        </Col>
      </Row>

      <br />
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
          <Link to={pathNames.ADMIN_HISTORY}>
            <Button className={"nav-item " + (isAtHistory && "active")}>
              Lịch sử khám bệnh
            </Button>
          </Link>
        </Col>
      </Row>

      <FormModal
        visible={visibleModal}
        onOk={onOkNewAppointment}
        onCancel={onCancelNewAppointment}
        cancelText="Hủy bỏ"
        okText="Tạo mới"
      >
        <h1>Tạo mới lịch hẹn</h1>

        <br />

        <NewAppointmentForm
          form={form}
          setValidSuccess={() => setValidSuccess(true)}
        />
      </FormModal>
    </div>
  );
};

export default withRouter(ExaminationHeader);
