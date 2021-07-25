import { Button, Col, Form, Input, Row } from "antd";
import localKeys from "../../constances/localKeys";
import "./login.scss";
import CorgiImg from "../../assets/corgi.png";
import { useForm } from "antd/lib/form/Form";
import pathNames from "../../router/pathNames";

const Login = () => {
  const [form] = useForm();

  const onFinish = (values) => {
    console.log(values);

    localStorage.setItem(localKeys.ACCESS_TOKEN, "qwerty");
    localStorage.setItem(localKeys.ROLE, "admin");

    window.location.href = pathNames.MAIN;
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
              <Button htmlType="submit" block>
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