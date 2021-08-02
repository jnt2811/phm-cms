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
        <h1>Chỉnh sửa thông tin</h1>

        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item label="Tên phòng khám" name="name">
            <Input disabled />
          </Form.Item>

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
