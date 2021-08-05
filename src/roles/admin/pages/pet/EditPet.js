import { Col, Form, Input, notification, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import UploadAvatar from "../../../../commons/uploadImage/UploadAvatar";
import { isEmptyData } from "../../../../utils";
import { doEditPet } from "../../../../ducks/slices/petSlice";
import { failMessages, successMessages } from "../../../../constances/messages";

const EditPet = ({ pet, visible, setVisible }) => {
  const [form] = useForm();

  const petReducer = useSelector((state) => state.pet);
  const dispatch = useDispatch();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (!isEmptyData(pet)) {
      form.setFieldsValue({
        name: pet.name,
        type: pet.type,
        color: pet.color,
        location: pet.location,
        description: pet.description,
      });
      setAvatarUrl(pet.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    const { isOk, message } = petReducer;

    const successMessage = successMessages.EDIT_PET;
    const failMessage = failMessages.EDIT_PET;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      form.resetFields();
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petReducer]);

  const onFinish = (values) => {
    const data = { ...values, avatar: avatarUrl, id: pet.id };
    dispatch(doEditPet(data));
    notification.open({ message: "Đang xử lý..." });
  };

  return (
    <div className="edit-pet">
      <FormModal
        visible={visible}
        okText="Lưu thay đổi"
        cancelText="Quay lại"
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        width={800}
      >
        <h1>Chỉnh sửa chó mèo</h1>

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
                  <Select.Option value="Chó">Chó</Select.Option>
                  <Select.Option value="Mèo">Mèo</Select.Option>
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

export default EditPet;
