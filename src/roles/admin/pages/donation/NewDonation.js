import { Col, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { sexKeys } from "../../../../constances/data";

const NewDonation = ({ visible, setVisible }) => {
  const [form] = useForm();

  const onOk = () => {
    form.submit();
  };

  const onCancel = () => {
    setVisible(false);
  };

  const onFinish = (values) => {};

  return (
    <div className="new-donation">
      <FormModal
        visible={visible}
        okText="Tạo mới"
        cancelText="Hủy bỏ"
        onOk={onOk}
        onCancel={onCancel}
        width={800}
      >
        <h1>Tạo mới quyên góp</h1>

        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Họ và tên"
            name="name"
            rules={[{ required: true, message: "Hãy điền họ và tên" }]}
          >
            <Input />
          </Form.Item>

          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
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
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Giới tính"
                name="gender"
                rules={[{ required: true, message: "Hãy chọn giới tính" }]}
              >
                <Select className="select">
                  <Select.Option value={sexKeys.MALE}>Nam</Select.Option>
                  <Select.Option value={sexKeys.FEMALE}>Nữ</Select.Option>
                  <Select.Option value={sexKeys.OTHER}>Khác</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Số tiền"
            name="amount"
            rules={[
              { required: true, message: "Hãy điền số tiền" },
              { pattern: /^\d+$/, message: "Định dạng số tiền không đúng" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </FormModal>
    </div>
  );
};

export default NewDonation;
