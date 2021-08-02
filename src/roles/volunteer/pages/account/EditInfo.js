import { Col, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { FormModal } from "../../../../commons/commonModal/CommonModal";

const EditInfo = ({ info, visible, setVisible }) => {
  const [form] = useForm();

  useEffect(() => {
    if (info) {
      form.setFieldsValue({
        name: info.name,
        dob: info.dob,
        gender: info.gender,
        phone: info.phone,
        email: info.email,
        address: info.address,
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  const onFinish = (values) => {
    console.log(values);
    setVisible(false);
  };

  return (
    <div className="edit-info">
      <FormModal
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        okText="Lưu thay đổi"
        cancelText="Quay lại"
        width={800}
      >
        <h1>Chỉnh sửa thông tin cá nhân</h1>

        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Row gutter={{ lg: 20 }}>
            <Col lg={10}>
              <Form.Item label="Họ và tên" name="name">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col lg={8}>
              <Form.Item label="Ngày sinh" name="dob">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col lg={6}>
              <Form.Item label="Giới tính" name="gender">
                <Input disabled />
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input disabled />
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
      </FormModal>
    </div>
  );
};

export default EditInfo;
