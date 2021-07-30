import { Col, Input, notification, Row, Select, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doEditVolunteer } from "../../../../ducks/slices/volunteerSlice";
import { validateDate } from "../../../../utils";

const EditVolunteer = ({ volunteer, visible, setVisible }) => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [oldInputDob, setOldInputDob] = useState();

  useEffect(() => {
    if (volunteer) {
      form.setFieldsValue({
        name: volunteer.name,
        dob: volunteer.dob,
        gender: volunteer.gender,
        phone: volunteer.phone,
        email: volunteer.email,
        address: volunteer.address,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    const { isOk, message } = volunteerReducer;

    const successMessage = successMessages.EDIT_NEW_VOLUNTEER;
    const failMessage = failMessages.EDIT_NEW_VOLUNTEER;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      form.resetFields();
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerReducer]);

  const onFinish = (values) => {
    if (!validateDate(values.dob)) {
      form.setFields([{ name: "dob", errors: ["Ngày sinh không hợp lệ"] }]);
    } else {
      const requestData = {
        ...values,
        id: volunteer.id,
      };
      dispatch(doEditVolunteer(requestData));
      notification.open({ message: "Đang xử lý..." });
    }
  };

  const handleInputDob = (e) => {
    const { value } = e.target;
    setOldInputDob(value);
    if (
      (value.length === 2 || value.length === 5) &&
      value.length > oldInputDob.length
    ) {
      form.setFieldsValue({ dob: value + "/" });
    }
  };

  return (
    <div className="edit-volunteer">
      <FormModal
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        okText="Lưu thay đổi"
        cancelText="Quay lại"
        width={800}
      >
        <h1>Chỉnh sửa tình nguyện viên</h1>

        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Hãy điền họ và tên" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
              <Form.Item
                label="Ngày sinh"
                name="dob"
                rules={[
                  { required: true, message: "Hãy điền ngày sinh" },
                  {
                    pattern: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
                    message: "Hãy nhập đúng định dạng ngày sinh",
                  },
                ]}
              >
                <Input
                  onChange={handleInputDob}
                  placeholder="DD/MM/YYYY"
                  maxLength={10}
                />
              </Form.Item>
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Hãy chọn giới tính" }]}
              >
                <Select className="select">
                  <Select.Option value={"Nam"}>Nam</Select.Option>
                  <Select.Option value={"Nữ"}>Nữ</Select.Option>
                  <Select.Option value={"Khác"}>Khác</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Email"
            name="email"
            rules={[
              {
                pattern: /\S+@\S+\.\S+/,
                message: "Hãy nhập đúng định dạng email",
              },
            ]}
          >
            <Input />
          </Form.Item>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Hãy điền địa chỉ" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </FormModal>
    </div>
  );
};

export default EditVolunteer;
