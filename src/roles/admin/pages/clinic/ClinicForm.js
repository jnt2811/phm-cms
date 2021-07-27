import { Col, Form, Input, Row } from "antd";
import { useEffect } from "react";

const ClinicForm = ({ clinic, form, setValidSuccess }) => {
  const onFinish = (values) => {
    setValidSuccess();
  };

  useEffect(() => {
    if (clinic) {
      form.setFieldsValue({
        name: clinic.name,
        phone: clinic.phone,
        email: clinic.email,
        address: clinic.address,
      });
    }
  }, [form, clinic]);

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Tên phòng khám"
        name="name"
        rules={[{ required: true, message: "Hãy điền tên phòng khám" }]}
      >
        <Input />
      </Form.Item>

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
  );
};

export default ClinicForm;
