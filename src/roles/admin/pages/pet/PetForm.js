import { Col, Form, Input, Row, Select } from "antd";
import { petKeys } from "../../../../constances/data";

const PetForm = ({ form, setValidSuccess }) => {
  const onFinish = (values) => {
    setValidSuccess();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Tên"
        name="name"
        rules={[{ required: true, message: "Hãy điền tên" }]}
      >
        <Input />
      </Form.Item>

      <Row gutter={{ lg: 20 }}>
        <Col lg={12}>
          <Form.Item
            label="Loài"
            name="type"
            rules={[{ required: true, message: "Hãy chọn loài" }]}
          >
            <Select className="select">
              <Select.Option value={petKeys.DOG}>Chó</Select.Option>
              <Select.Option value={petKeys.CAT}>Mèo</Select.Option>
            </Select>
          </Form.Item>
        </Col>

        <Col lg={12}>
          <Form.Item
            label="Màu lông"
            name="color"
            rules={[
              {
                required: "true",
                message: "Hãy điền màu lông",
              },
            ]}
          >
            <Input />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Nơi tìm thấy"
        name="location"
        rules={[{ required: true, message: "Hãy điền nơi tìm thấy" }]}
      >
        <Input />
      </Form.Item>

      <Form.Item label="Mô tả" name="description">
        <Input.TextArea rows={4} />
      </Form.Item>
    </Form>
  );
};

export default PetForm;
