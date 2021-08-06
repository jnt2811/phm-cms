import { Form, Input } from "antd";
import AddressSelector from "../AddressSelector";

const NewDonator = ({ form, dispatchNewDonator }) => {
  const onFinish = (values) => {
    const { name, phone, province, district, ward } = values;

    const address = {
      province: JSON.parse(province),
      district: JSON.parse(district),
      ward: JSON.parse(ward),
    };

    const donator = {
      name: name,
      phone: phone,
      // address: JSON.stringify(address)
    };

    dispatchNewDonator(donator);
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

        <AddressSelector form={form} />
      </Form>
    </div>
  );
};

export default NewDonator;
