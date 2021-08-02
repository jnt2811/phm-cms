import { Form, Input } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormModal } from "../../../../../commons/commonModal/CommonModal";

const NewReport = ({ appointment, visible, setVisible }) => {
  const [form] = useForm();

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    setVisible(false);
    console.log(values);
  };

  return (
    <div className="new-report">
      <FormModal
        visible={visible}
        okText="Tạo mới"
        cancelText="Quay lại"
        onCancel={onCancel}
        onOk={() => form.submit()}
      >
        <h1>Tạo mới báo cáo</h1>

        <br />

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Form.Item
            label="Cân nặng"
            name="weight"
            rules={[{ required: true, message: "Hãy điền cân nặng" }]}
          >
            <Input />
          </Form.Item>

          <Form.Item label="Ghi chú" name="note">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </FormModal>
    </div>
  );
};

export default NewReport;
