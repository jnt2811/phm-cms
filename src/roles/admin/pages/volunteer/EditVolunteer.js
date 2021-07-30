import { Col, Input, notification, Row, Select, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { sexKeys } from "../../../../constances/data";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doEditVolunteer } from "../../../../ducks/slices/volunteerSlice";

const EditVolunteer = ({ volunteer, visible, setVisible }) => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [form] = useForm();

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
  }, [form, volunteer]);

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

  const onOk = () => {
    form.submit();
  };

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const requestData = {
      ...values,
      id: volunteer.id,
    };
    dispatch(doEditVolunteer(requestData));
    notification.open({ message: "Đang xử lý..." });
  };

  return (
    <div className="edit-volunteer">
      <FormModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
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
                rules={[{ required: true, message: "Hãy điền ngày sinh" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Hãy chọn giới tính" }]}
              >
                <Select className="select">
                  <Select.Option value={sexKeys.MALE}>Nam</Select.Option>
                  <Select.Option value={sexKeys.FEMALE}>Nữ</Select.Option>
                  <Select.Option value={sexKeys.OTHER}>Khác</Select.Option>
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

export default EditVolunteer;
