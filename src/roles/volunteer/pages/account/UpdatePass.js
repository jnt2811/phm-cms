import { Button, Col, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";

const UpdatePass = () => {
  const [form] = useForm();

  const onFinish = (values) => {
    if (values.password !== values.retype) {
      form.setFields([
        { name: "retype", errors: ["Mật khẩu gõ lại không khớp"] },
      ]);
    } else {
      console.log(values);
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
