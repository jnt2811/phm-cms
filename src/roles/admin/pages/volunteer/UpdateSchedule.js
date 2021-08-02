import { Form, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormModal } from "../../../../commons/commonModal/CommonModal";

const UpdateSchedule = ({ volunteer, visible, setVisble }) => {
  const [form] = useForm();

  const onCancel = () => {
    form.resetFields();
    setVisble(false);
  };

  const onFinish = (values) => {
    console.log(values);
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

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            name="schedule"
            label="Ca làm việc"
            rules={[{ required: true, message: "Hãy chọn ca làm việc" }]}
          >
            <Select className="select">
              <Select.Option value="Ca 1">Ca 1</Select.Option>
            </Select>
          </Form.Item>
        </Form>
      </FormModal>
    </div>
  );
};

export default UpdateSchedule;
