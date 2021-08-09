import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";

const PrescriptionInput = () => {
  return (
    <Form.List name="prescriptions">
      {(fields, { add, remove }) => (
        <>
          <label>Đơn thuốc ({fields.length})</label>

          {fields.map(({ key, name, fieldKey, ...restField }) => (
            <Form.Item key={key}>
              <Row gutter={{ sm: 10 }} align="middle">
                <Col flex="auto">
                  <Form.Item
                    {...restField}
                    name={[name, "name"]}
                    fieldKey={[fieldKey, "name"]}
                    rules={[
                      {
                        required: true,
                        message: "Hãy điền tên thuốc",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tên thuốc" />
                  </Form.Item>
                </Col>

                <Col flex="auto">
                  <Form.Item
                    {...restField}
                    name={[name, "instruction"]}
                    fieldKey={[fieldKey, "instruction"]}
                    rules={[
                      {
                        required: true,
                        message: "Hãy điền hướng dẫn sử dụng",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Hướng dẫn sử dụng" />
                  </Form.Item>
                </Col>

                <Col>
                  <MinusCircleOutlined
                    onClick={() => remove(name)}
                    className="minus-btn"
                  />
                </Col>
              </Row>
            </Form.Item>
          ))}

          <Form.Item>
            <Button
              onClick={() => add()}
              block
              icon={<PlusOutlined />}
              className="add-field-btn"
            >
              Thêm thuốc
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default PrescriptionInput;
