import { Button, Col, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { failMessages, successMessages } from "../../../../constances/messages";
import {
  doUpdateUserInfo,
  resetAuth,
} from "../../../../ducks/slices/authSlice";

const UpdatePass = () => {
  const [form] = useForm();
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    const { isOk, message } = authReducer;

    const successMSg = successMessages.UPDATE_USER_INFO;
    const failMSg = failMessages.UPDATE_USER_INFO;

    if (isOk === true && message === successMSg) {
      form.resetFields();
      dispatch(resetAuth());
    } else if (isOk === false && message === failMSg) {
      dispatch(resetAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReducer]);

  const onFinish = (values) => {
    if (values.password !== values.retype) {
      form.setFields([
        { name: "retype", errors: ["Mật khẩu gõ lại không khớp"] },
      ]);
    } else {
      notification.open({ message: "Đang xử lý..." });
      dispatch(doUpdateUserInfo({ password: values.password }));
    }
  };

  return (
    <div className="update-pass">
      <h1>Đổi mật khẩu</h1>

      <br />

      <Form form={form} onFinish={onFinish} layout="vertical">
        <Row gutter={{ sm: 20 }}>
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

        <br />

        <Form.Item>
          <Button htmlType="submit">Lưu thay đổi</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default UpdatePass;
