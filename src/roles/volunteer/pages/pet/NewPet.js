import { Col, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState } from "react";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import UploadAvatar from "../../../../commons/uploadImage/UploadAvatar";
import { petKeys } from "../../../../constances/data";

const NewPet = ({ visible, setVisible }) => {
  const [form] = useForm();

  const [avatarUrl, setAvatarUrl] = useState();
  const [isUploading, setIsUploading] = useState(false);

  const onOk = () => {
    form.submit();
  };

  const onCancel = () => {
    form.resetFields();
    setAvatarUrl();
    setVisible(false);
  };

  const onFinish = (values) => {
    console.log({ ...values, avatar: avatarUrl });
    form.resetFields();
    setAvatarUrl();
    setVisible(false);
  };

  return (
    <div className="new-pet">
      <FormModal
        visible={visible}
        okText="Tạo mới"
        cancelText="Hủy bỏ"
        onOk={onOk}
        onCancel={onCancel}
        width={800}
      >
        <h1>Tạo mới động vật</h1>

        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item name="avatar" style={{ textAlign: "center" }}>
            <UploadAvatar
              avatarUrl={avatarUrl}
              isUploading={isUploading}
              setAvatarUrl={setAvatarUrl}
              setIsUploading={setIsUploading}
            />
          </Form.Item>

          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
              <Form.Item
                label="Tên"
                name="name"
                rules={[{ required: true, message: "Hãy điền tên" }]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Loài"
                name="type"
                rules={[{ required: true, message: "Hãy chọn loài" }]}
              >
                <Select className="select">
                  <Select.Option value={petKeys.DOG}>Chó</Select.Option>
                  <Select.Option value={petKeys.CAT}>Mèo</Select.Option>
                </Select>
              </Form.Item>
            </Col>
          </Row>

          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
              <Form.Item
                label="Màu lông"
                name="color"
                rules={[
                  {
                    required: "true",
                    message: "Hãy điền màu lông",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Nơi tìm thấy"
                name="location"
                rules={[{ required: true, message: "Hãy điền nơi tìm thấy" }]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item label="Mô tả" name="description">
            <Input.TextArea rows={4} />
          </Form.Item>
        </Form>
      </FormModal>
    </div>
  );
};

export default NewPet;
