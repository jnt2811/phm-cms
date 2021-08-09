import { MinusCircleOutlined, PlusOutlined } from "@ant-design/icons";
import { Button, Col, Form, Input, Row } from "antd";

const VaccineInput = () => {
  return (
    <Form.List name="vaccines">
      {(fields, { add, remove }) => (
        <>
          <label>Vaccine ({fields.length})</label>

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
                        message: "Hãy điền tên loại vaccine",
                      },
                    ]}
                    noStyle
                  >
                    <Input placeholder="Tên loại vaccine" />
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
              Thêm vaccine
            </Button>
          </Form.Item>
        </>
      )}
    </Form.List>
  );
};

export default VaccineInput;
