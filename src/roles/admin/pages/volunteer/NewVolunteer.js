import { Col, Input, notification, Row, Select, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doCreateVolunteer } from "../../../../ducks/slices/volunteerSlice";
import { validateDate } from "../../../../utils";

const NewVolunteer = ({ visible, setVisible }) => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [oldInputDob, setOldInputDob] = useState();

  useEffect(() => {
    const { isOk, message } = volunteerReducer;

    const successMessage = successMessages.CREATE_NEW_VOLUNTEER;
    const failMessage = failMessages.CREATE_NEW_VOLUNTEER;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      form.resetFields();
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerReducer]);

  const onOk = () => {
    form.submit();
  };

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    if (!validateDate(values.dob)) {
      form.setFields([{ name: "dob", errors: ["Ngày sinh không hợp lệ"] }]);
    } else {
      dispatch(doCreateVolunteer(values));
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
    <div className="new-volunteer">
      <FormModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Tạo mới"
        cancelText="Hủy bỏ"
        width={800}
      >
        <h1>Tạo mới tình nguyện viên</h1>

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

          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
              <Form.Item
                label="Số điện thoại"
                name="phone"
                rules={[
                  {
                    required: "true",
                    message: "Hãy điền số điện thoại",
                  },
                  {
                    pattern: /^[0]?[35789]\d{8}$/,
                    message: "Hãy nhập đúng định dạng số điện thoại",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12}>
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
            </Col>
          </Row>

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

export default NewVolunteer;
