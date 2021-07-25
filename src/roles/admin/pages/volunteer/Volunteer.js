import { Button, Col, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { volunteerList, sexKeys } from "../../../../constances/data";
import { GreenTag, RedTag } from "../../../../commons/commonTag/CommonTag";
import { EditOutlined, SyncOutlined, UnlockOutlined } from "@ant-design/icons";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import VolunteerForm from "./VolunteerForm";
import { useForm } from "antd/lib/form/Form";
import PasswordForm from "./PasswordForm";

const Volunteer = () => {
  const onNewVolunteer = () => {
    setVisibleNewModal(true);
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

  const onEditVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleEditModal(true);
  };
  const onOkEditModal = () => {
    editForm.submit();
    if (formValidSuccess) {
      console.log("Edit Form");
      console.log(editForm.getFieldsValue());
      setVisibleEditModal(false);
      setSelectedVolunteer();
    }
  };
  const onCancelEditModal = () => {
    setVisibleEditModal(false);
    setFormValidSuccess(false);
    setSelectedVolunteer();
  };

  const onUpdatePassword = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisiblePassModal(true);
  };
  const onOkUpdatePassword = () => {
    passForm.submit();
    if (formValidSuccess) {
      console.log("Password Form");
      console.log(passForm.getFieldsValue());
      setVisiblePassModal(false);
      setSelectedVolunteer();
    }
  };
  const onCancelUpdatePassword = () => {
    setVisiblePassModal(false);
    setSelectedVolunteer();
  };

  const onSwitchCollab = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleSwitchModal(true);
  };
  const onOkSwitchCollab = () => {
    console.log("Switch Success");
    setVisibleSwitchModal(false);
    setSelectedVolunteer();
  };
  const onCancelSwitchCollab = () => {
    setVisibleSwitchModal(false);
    setSelectedVolunteer();
  };

  const [newForm] = useForm();
  const [editForm] = useForm();
  const [passForm] = useForm();

  const [volunteers, setvolunteers] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visiblePassModal, setVisiblePassModal] = useState(false);
  const [visibleSwitchModal, setVisibleSwitchModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState();
  const [formValidSuccess, setFormValidSuccess] = useState(false);

  useEffect(() => {
    setvolunteers(volunteerList);
  }, []);

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      render: (sex) =>
        sex === sexKeys.MALE ? "Nam" : sexKeys.FEMALE ? "Nữ" : "Khác",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "collab",
      key: "collab",
      render: (collab) =>
        collab ? <GreenTag>Đang làm</GreenTag> : <RedTag>Nghỉ làm</RedTag>,
    },
    {
      title: "",
      dataIndex: "collab",
      key: "collab",
      render: (collab, record) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              className="edit-btn"
              icon={<EditOutlined />}
              disabled={!collab}
              onClick={() => onEditVolunteer(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="collab-btn"
              icon={<SyncOutlined />}
              onClick={() => onSwitchCollab(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="password-btn"
              icon={<UnlockOutlined />}
              disabled={!collab}
              onClick={() => onUpdatePassword(record)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === "Disabled User",
  //     name: record.name,
  //   }),
  // };

  return (
    <div className="volunteer">
      <Row justify="space-between" align="middle" gutter={{ lg: 20 }}>
        <Col>
          <Row align="middle" gutter={{ lg: 20 }}>
            <Col>
              <h1>Danh sách tình nguyện viên</h1>
            </Col>

            <Col>
              <Button onClick={onNewVolunteer}>Tạo mới</Button>
            </Col>
          </Row>
        </Col>

        <Col>
          <Button>Lịch làm việc</Button>
        </Col>
      </Row>

      <div className="table-container">
        <Table
          columns={columns}
          dataSource={volunteers}
          pagination={false}
          // rowSelection={{ type: "checkbox", ...rowSelection }}
        />
      </div>

      <div className="new-volunteer-modal">
        <FormModal
          visible={visibleNewModal}
          onOk={onOkNewModal}
          onCancel={onCancelNewModal}
          okText="Tạo mới"
          cancelText="Hủy bỏ"
          width={800}
        >
          <h1>Tạo mới tình nguyện viên</h1>
          <br />
          <VolunteerForm
            form={newForm}
            setValidSuccess={() => setFormValidSuccess(true)}
          />
        </FormModal>
      </div>

      <div className="edit-volunteer-modal">
        {selectedVolunteer && (
          <FormModal
            visible={visibleEditModal}
            onOk={onOkEditModal}
            onCancel={onCancelEditModal}
            okText="Lưu thay đổi"
            cancelText="Quay lại"
            width={800}
          >
            <h1>Chỉnh sửa tình nguyện viên</h1>
            <br />
            <VolunteerForm
              volunteer={selectedVolunteer}
              form={editForm}
              setValidSuccess={() => setFormValidSuccess(true)}
            />
          </FormModal>
        )}
      </div>

      <div className="switch-collab-modal">
        {selectedVolunteer && (
          <FormModal
            visible={visibleSwitchModal}
            onOk={onOkSwitchCollab}
            onCancel={onCancelSwitchCollab}
            okText="Xác nhận"
            cancelText="Hủy bỏ"
          >
            <h1>Xác nhận thay đổi trạng thái</h1>
            <h3>Tình nguyện viên: {selectedVolunteer.name}</h3>
            <br />
            <p>
              Bạn chắc chắn muốn thay đổi trạng của tình nguyện viên này chứ?
            </p>
          </FormModal>
        )}
      </div>

      <div className="update-password-modal">
        {selectedVolunteer && (
          <FormModal
            visible={visiblePassModal}
            onOk={onOkUpdatePassword}
            onCancel={onCancelUpdatePassword}
            okText="Cập nhật"
            cancelText="Quay lại"
            width={800}
          >
            <h1>Đổi mật khẩu</h1>
            <h3>Tình nguyện viên: {selectedVolunteer.name}</h3>
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

export default Volunteer;
