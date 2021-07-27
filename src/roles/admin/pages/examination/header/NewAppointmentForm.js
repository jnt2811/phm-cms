import { Col, DatePicker, Form, Row, Select } from "antd";

const NewAppointmentForm = ({ form, setValidSuccess }) => {
  const onFinish = (values) => {
    setValidSuccess();
  };

  return (
    <Form layout="vertical" form={form} onFinish={onFinish}>
      <Form.Item
        label="Chọn chó mèo"
        name="pet"
        rules={[{ required: true, message: "Hãy chọn chó mèo" }]}
      >
        <Select className="select" showSearch>
          <Select.Option value="Tom">Tom</Select.Option>
        </Select>
      </Form.Item>

      <Row gutter={{ lg: 20 }}>
        <Col lg={12}>
          <Form.Item
            label="Chọn thời điểm"
            name="date"
            rules={[{ required: true, message: "Hãy chọn thời điểm" }]}
          >
            <DatePicker
              style={{ width: "100%" }}
              className="date-picker"
              placeholder="DD/MM/YYYY"
              format="DD/MM/YYYY"
            />
          </Form.Item>
        </Col>

        <Col lg={12}>
          <Form.Item
            label="Chọn thời gian"
            name="time"
            rules={[{ required: true, message: "Hãy chọn thời gian" }]}
          >
            <DatePicker.TimePicker
              style={{ width: "100%" }}
              className="date-picker"
              placeholder="HH:mm"
              showSecond={false}
              format="HH:mm"
            />
          </Form.Item>
        </Col>
      </Row>

      <Form.Item
        label="Chọn phòng khám"
        name="clinic"
        rules={[{ required: true, message: "Hãy chọn phòng khám" }]}
      >
        <Select className="select" showSearch>
          <Select.Option value="ABC">Phòng khám ABC</Select.Option>
        </Select>
      </Form.Item>
    </Form>
  );
};

export default NewAppointmentForm;
