import { Form, Input } from "antd";

const NewDonator = ({ form, dispatchForNewDonator }) => {
  const onFinish = (values) => {
    dispatchForNewDonator(values);
  };

  return (
    <div className="new-donator">
      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Họ và tên"
          name="name"
          rules={[{ required: true, message: "Hãy điền họ và tên" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Số điện thoại"
          name="phone"
          rules={[
            {
              required: "true",
              message: "Hãy điền số điện thoại",
            },
            {
              pattern: /^[0]?[35789]\d{8}$/,
              message: "Hãy nhập đúng định dạng số điện thoại",
            },
          ]}
        >
          <Input />
        </Form.Item>
      </Form>
    </div>
  );
};

export default NewDonator;
