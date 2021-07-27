import { Col, Form, Input, Row } from "antd";

const PasswordForm = ({ form, setValidSuccess }) => {
  const onFinish = (values) => {
    if (values.password !== values.retype) {
      form.setFields([
        { name: "retype", errors: ["Mật khẩu gõ lại không khớp"] },
      ]);
    } else {
      setValidSuccess();
    }
  };

  return (
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
  );
};

export default PasswordForm;
