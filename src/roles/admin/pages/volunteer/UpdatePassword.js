import { Col, Input, notification, Row, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doUpdatePassVolunteer } from "../../../../ducks/slices/volunteerSlice";

const UpdatePassword = ({ volunteer, visible, setVisible }) => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [form] = useForm();

  useEffect(() => {
    const { isOk, message } = volunteerReducer;

    const successMessage = successMessages.UPDATE_PASSWORD_VOLUNTEER;
    const failMessage = failMessages.UPDATE_PASSWORD_VOLUNTEER;

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
    if (values.password !== values.retype) {
      form.setFields([
        { name: "retype", errors: ["Mật khẩu gõ lại không khớp"] },
      ]);
    } else {
      const requestData = {
        id: volunteer.id,
        password: values.password,
      };
      dispatch(doUpdatePassVolunteer(requestData));
      notification.open({ message: "Đang xử lý..." });
    }
  };

  return (
    <div className="update-password-volunteer">
      <FormModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Tạo mới"
        cancelText="Hủy bỏ"
        width={800}
      >
        <h1>Đổi mật khẩu</h1>

        <h3>Tình nguyện viên: {volunteer && volunteer.name}</h3>

        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                  {
                    required: "true",
                    message: "Hãy nhập mật khẩu mới",
                  },
                ]}
              >
                <Input.Password className="input-password" />
              </Form.Item>
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="retype"
                rules={[
                  {
                    required: "true",
                    message: "Hãy nhập lại mật khẩu mới",
                  },
                ]}
              >
                <Input.Password className="input-password" />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormModal>
    </div>
  );
};

export default UpdatePassword;
