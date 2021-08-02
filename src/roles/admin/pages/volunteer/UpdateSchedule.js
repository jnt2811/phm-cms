import { Form, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormModal } from "../../../../commons/commonModal/CommonModal";

const UpdateSchedule = ({ volunteer, visible, setVisible }) => {
  const [form] = useForm();

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log(values);
    setVisible(false);
  };

  const renderFormItems = () => {
    let weekdays = [
      { id: 2, name: "monday" },
      { id: 3, name: "tuesday" },
      { id: 4, name: "wednesday" },
      { id: 5, name: "thursday" },
      { id: 6, name: "friday" },
      { id: 7, name: "saturday" },
    ];

    return weekdays.map((weekday) => (
      <Form.Item
        key={weekday.id}
        name={weekday.name}
        label={"Thứ " + weekday.id}
      >
        <Select className="select">
          <Select.Option value={null}></Select.Option>
          <Select.Option value="Sáng">Sáng</Select.Option>
          <Select.Option value="Chiều">Chiều</Select.Option>
          <Select.Option value="Cả ngày">Cả ngày</Select.Option>
        </Select>
      </Form.Item>
    ));
  };

  return (
    <div className="update-schedule">
      <FormModal
        visible={visible}
        onOk={() => form.submit()}
        onCancel={onCancel}
        okText="Cập nhật"
        cancelText="Quay lại"
      >
        <h1>Cập nhật lịch làm việc</h1>

        <h3>Tình nguyện viên: {volunteer && volunteer.name}</h3>

        <br />

        <Form form={form} onFinish={onFinish}>
          {renderFormItems()}
        </Form>
      </FormModal>
    </div>
  );
};

export default UpdateSchedule;
