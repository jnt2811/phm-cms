import { Col, Form, Input, Row, Select } from "antd";
import { useEffect } from "react";
import { sexKeys } from "../../../../constances/data";

const VolunteerForm = ({ volunteer, form, setValidSuccess }) => {
  const onFinish = (values) => {
    setValidSuccess();
  };

  useEffect(() => {
    if (volunteer) {
      form.setFieldsValue({
        name: volunteer.name,
        dob: volunteer.dob,
        sex: volunteer.sex,
        phone: volunteer.phone,
        email: volunteer.email,
        address: volunteer.address,
      });
    }
  }, [form, volunteer]);

  return (
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
            name="sex"
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
  );
};

export default VolunteerForm;
