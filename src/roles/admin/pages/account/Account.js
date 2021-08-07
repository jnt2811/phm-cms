import { useForm } from "antd/lib/form/Form";
import { Input, Form, Button, notification, Row, Col } from "antd";
import localKeys from "../../../../constances/localKeys";
import { useDispatch, useSelector } from "react-redux";
import {
  doUpdateUserInfo,
  resetAuth,
} from "../../../../ducks/slices/authSlice";
import { useEffect } from "react";

const Account = () => {
  const { id } = JSON.parse(localStorage.getItem(localKeys.USER_DATA));

  const [form] = useForm();
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  useEffect(() => {
    if (authReducer.isOk === true) {
      notification.success({ message: authReducer.message });
      dispatch(resetAuth());
    } else if (authReducer.isOk === false) {
      notification.error({ message: authReducer.message });
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
      dispatch(doUpdateUserInfo({ id: id, password: values.password }));
    }
  };

  return (
    <div className="account">
      <h1>Tài khoản</h1>

      <br />

      <h2>Đổi mật khẩu</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Row gutter={[{ md: 20 }, { sm: 20 }]}>
          <Col md={12}>
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

          <Col md={12}>
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

        <Form.Item>
          <Button htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Account;
