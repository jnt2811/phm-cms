import { Button, Col, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { clinicList } from "../../../../constances/data";
import ClinicForm from "./ClinicForm";
import ClinicTable from "./ClinicTable";
import PasswordForm from "./PasswordForm";

const Clinic = () => {
  const onNewClinic = () => {
    setVisibleNewModal(true);
    setFormValidSuccess(false);
  };
  const onOkNewModal = () => {
    newForm.submit();
    if (formValidSuccess) {
      console.log("New Form");
      console.log(newForm.getFieldsValue());
      setVisibleNewModal(false);
    }
  };
  const onCancelNewModal = () => {
    newForm.resetFields();
    setVisibleNewModal(false);
  };

  const onEditClinic = (clinic) => {
    setSelectedClinic(clinic);
    setVisibleEditModal(true);
    setFormValidSuccess(false);
  };
  const onOkEditModal = () => {
    editForm.submit();
    if (formValidSuccess) {
      console.log("Edit Form");
      console.log(editForm.getFieldsValue());
      setVisibleEditModal(false);
      setSelectedClinic();
    }
  };
  const onCancelEditModal = () => {
    setVisibleEditModal(false);
    setFormValidSuccess(false);
    setSelectedClinic();
  };

  const onUpdatePassword = (clinic) => {
    setSelectedClinic(clinic);
    setVisiblePassModal(true);
    setFormValidSuccess(false);
  };
  const onOkUpdatePassword = () => {
    passForm.submit();
    if (formValidSuccess) {
      console.log("Password Form");
      console.log(passForm.getFieldsValue());
      setVisiblePassModal(false);
      setSelectedClinic();
    }
  };
  const onCancelUpdatePassword = () => {
    setVisiblePassModal(false);
    setSelectedClinic();
  };

  const onSwitchCollab = (clinic) => {
    setSelectedClinic(clinic);
    setVisibleSwitchModal(true);
  };
  const onOkSwitchCollab = () => {
    console.log("Switch Success");
    setVisibleSwitchModal(false);
    setSelectedClinic();
  };
  const onCancelSwitchCollab = () => {
    setVisibleSwitchModal(false);
    setSelectedClinic();
  };

  const [newForm] = useForm();
  const [editForm] = useForm();
  const [passForm] = useForm();

  const [clinics, setClinics] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visiblePassModal, setVisiblePassModal] = useState(false);
  const [visibleSwitchModal, setVisibleSwitchModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState();
  const [formValidSuccess, setFormValidSuccess] = useState(false);

  useEffect(() => {
    setClinics(clinicList);
  }, []);

  return (
    <div className="clinic">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Danh sách phòng khám</h1>
        </Col>

        <Col>
          <Button onClick={onNewClinic}>Tạo mới</Button>
        </Col>
      </Row>

      <div className="table-container">
        <ClinicTable
          dataSource={clinics}
          onEditClinic={onEditClinic}
          onSwitchCollab={onSwitchCollab}
          onUpdatePassword={onUpdatePassword}
        />
      </div>

      <div className="clinic-modal">
        <FormModal
          visible={visibleNewModal}
          okText="Tạo mới"
          cancelText="Hủy bỏ"
          onOk={onOkNewModal}
          onCancel={onCancelNewModal}
          width={800}
        >
          <h1>Tạo mới phòng khám</h1>
          <br />
          <ClinicForm
            form={newForm}
            setValidSuccess={() => setFormValidSuccess(true)}
          />
        </FormModal>
      </div>

      <div className="edit-clinic-modal">
        {selectedClinic && (
          <FormModal
            visible={visibleEditModal}
            onOk={onOkEditModal}
            onCancel={onCancelEditModal}
            okText="Lưu thay đổi"
            cancelText="Quay lại"
            width={800}
          >
            <h1>Chỉnh sửa phòng khám</h1>
            <br />
            <ClinicForm
              clinic={selectedClinic}
              form={editForm}
              setValidSuccess={() => setFormValidSuccess(true)}
            />
          </FormModal>
        )}
      </div>

      <div className="switch-collab-modal">
        {selectedClinic && (
          <FormModal
            visible={visibleSwitchModal}
            onOk={onOkSwitchCollab}
            onCancel={onCancelSwitchCollab}
            okText="Xác nhận"
            cancelText="Hủy bỏ"
          >
            <h1>Xác nhận thay đổi trạng thái</h1>
            <h3>Phòng khám: {selectedClinic.name}</h3>
            <br />
            <p>Bạn chắc chắn muốn thay đổi trạng của phòng khám này chứ?</p>
          </FormModal>
        )}
      </div>

      <div className="update-password-modal">
        {selectedClinic && (
          <FormModal
            visible={visiblePassModal}
            onOk={onOkUpdatePassword}
            onCancel={onCancelUpdatePassword}
            okText="Cập nhật"
            cancelText="Quay lại"
            width={800}
          >
            <h1>Đổi mật khẩu</h1>
            <h3>Phòng khám: {selectedClinic.name}</h3>
            <br />
            <PasswordForm
              form={passForm}
              setValidSuccess={() => setFormValidSuccess(true)}
            />
          </FormModal>
        )}
      </div>
    </div>
  );
};

export default Clinic;
