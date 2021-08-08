import { Col, Form, Input, notification, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import UploadAvatar from "../../../../commons/uploadImage/UploadAvatar";
import { failMessages, successMessages } from "../../../../constances/messages";
import {
  doUpdateUserInfo,
  resetAuth,
} from "../../../../ducks/slices/authSlice";

const EditInfo = ({ info, visible, setVisible }) => {
  const [form] = useForm();
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [avatarUrl, setAvatarUrl] = useState("");
  const [isUploading, setIsUploading] = useState(false);

  useEffect(() => {
    if (info) {
      form.setFieldsValue({
        name: info.name,
        phone: info.phone,
        email: info.email,
        address: info.address,
      });
      setAvatarUrl(info.avatar);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    const { isOk, message } = authReducer;

    const successMSg = successMessages.UPDATE_USER_INFO;
    const failMSg = failMessages.UPDATE_USER_INFO;

    if (isOk === true && message === successMSg) {
      notification.success({ message: successMSg });
      dispatch(resetAuth());
      setVisible(false);
    } else if (isOk === false && message === failMSg) {
      notification.error({ message: failMSg });
      dispatch(resetAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReducer]);

  const onFinish = (values) => {
    const data = {
      avatar: avatarUrl,
      email: values.email,
      address: values.address,
    };
    notification.open({ message: "Đang xử lý..." });
    dispatch(doUpdateUserInfo(data));
  };

  return (
    <div className="edit-info">
      <FormModal
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        okText="Lưu thay đổi"
        cancelText="Quay lại"
        width={800}
      >
        <h1>Chỉnh sửa thông tin phòng khám</h1>

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

          <Form.Item label="Tên phòng khám" name="name">
            <Input disabled />
          </Form.Item>

          <Row gutter={{ lg: 20 }}>
            <Col lg={12}>
              <Form.Item label="Số điện thoại" name="phone">
                <Input disabled />
              </Form.Item>
            </Col>

            <Col lg={12}>
              <Form.Item
                label="Email"
                name="email"
                rules={[
                  {
                    pattern: /\S+@\S+\.\S+/,
                    message: "Hãy nhập đúng định dạng email",
                  },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
          </Row>

          <Form.Item
            label="Địa chỉ"
            name="address"
            rules={[{ required: true, message: "Hãy điền địa chỉ" }]}
          >
            <Input />
          </Form.Item>
        </Form>
      </FormModal>
    </div>
  );
};

export default EditInfo;
