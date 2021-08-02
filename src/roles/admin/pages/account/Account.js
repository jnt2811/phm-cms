import { useForm } from "antd/lib/form/Form";

const { Divider, Input, Form, Button, notification } = require("antd");

const Account = () => {
  const [form] = useForm();

  const onFinish = (values) => {
    if (values.password !== values.retype) {
      form.setFields([
        { name: "retype", errors: ["Mật khẩu gõ lại không khớp"] },
      ]);
    } else {
      console.log(values);
      notification.success({ message: "Success" });
    }
  };

  return (
    <div className="account">
      <h1>Tài khoản</h1>

      <br />

      <h2>Thông tin cơ bản</h2>

      <p>Số điện thoại: </p>
      <p>Vai trò: </p>

      <Divider />

      <h2>Đổi mật khẩu</h2>

      <Form layout="vertical" form={form} onFinish={onFinish}>
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

        <Form.Item>
          <Button htmlType="submit">Cập nhật</Button>
        </Form.Item>
      </Form>
    </div>
  );
};

export default Account;
