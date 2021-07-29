import { Button, Col, Form, Input, Row, notification } from "antd";
import "./login.scss";
import CorgiImg from "../../assets/corgi.png";
import { useForm } from "antd/lib/form/Form";
import pathNames from "../../router/pathNames";
import { useDispatch, useSelector } from "react-redux";
import { doLogin, resetLogin } from "../../ducks/slices/authSlice";
import { useEffect } from "react";
import { useHistory } from "react-router-dom";
import { useState } from "react";

const Login = () => {
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const history = useHistory();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authReducer.isOk === true) {
      setIsLoading(false);
      notification.open({ message: authReducer.message });
      dispatch(resetLogin());
      history.push(pathNames.MAIN);
    } else if (authReducer.isOk === false) {
      setIsLoading(false);
      notification.open({ message: authReducer.message });
      dispatch(resetLogin());
    }
  }, [authReducer, dispatch, history]);

  const [form] = useForm();

  const onFinish = (values) => {
    setIsLoading(true);
    dispatch(doLogin(values));
  };

  return (
    <div className="login">
      <Row justify="space-between" align="middle">
        <Col lg={10}>
          <img src={CorgiImg} alt="" />
        </Col>

        <Col lg={12}>
          <h1>Đăng nhập</h1>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
            >
              <Input.Password className="input-password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" block loading={isLoading}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
