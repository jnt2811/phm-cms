import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";

const AllergyInput = () => {
  return (
    <Form.List name="allergies">
      {(fields, { add, remove }) => (
        <>
          <label>Dị ứng ({fields.length})</label>

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
                        message: "Hãy điền tên loại dị ứng",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tên loại dị ứng" />
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
              Thêm loại dị ứng
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default AllergyInput;
