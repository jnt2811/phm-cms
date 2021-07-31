import { Input, notification, Form, Radio } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doUpdateAuthClinic } from "../../../../ducks/slices/clinicSlice";

const UpdatePassword = ({ clinic, visible, setVisible }) => {
  const clinicReducer = useSelector((state) => state.clinic);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [isPhoneSelected, setIsPhoneSelected] = useState(true);

  useEffect(() => {
    const { isOk, message } = clinicReducer;

    const successMessage = successMessages.UPDATE_AUTH_CLINIC;
    const failMessage = failMessages.UPDATE_AUTH_CLINIC;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      form.resetFields();
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicReducer]);

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    let requestData = {
      id: clinic.id,
    };

    if (!isPhoneSelected) {
      if (values.password !== values.retype) {
        form.setFields([
          { name: "retype", errors: ["Mật khẩu gõ lại không khớp"] },
        ]);
      } else {
        requestData.password = values.password;
        dispatch(doUpdateAuthClinic(requestData));
        notification.open({ message: "Đang xử lý..." });
      }
    } else {
      requestData.phone = values.phone;
      dispatch(doUpdateAuthClinic(requestData));
      notification.open({ message: "Đang xử lý..." });
    }
  };

  return (
    <div className="update-auth-clinic">
      <FormModal
        visible={visible}
        onOk={() => form.submit()}
        onCancel={onCancel}
        okText="Cập nhật"
        cancelText="Quay lại"
      >
        <h1>Cập nhật xác thực</h1>

        <h3>Phòng khám: {clinic && clinic.name}</h3>

        <br />

        <Radio.Group
          onChange={(e) => setIsPhoneSelected(e.target.value)}
          value={isPhoneSelected}
        >
          <Radio value={true}>Số điện thoại</Radio>
          <Radio value={false}>Mật khẩu</Radio>
        </Radio.Group>

        <br />
        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          {isPhoneSelected ? (
            <Form.Item
              label="Số điện thoại mới"
              name="phone"
              rules={[
                {
                  required: "true",
                  message: "Hãy điền số điện thoại mới",
                },
                {
                  pattern: /^[0]?[35789]\d{8}$/,
                  message: "Hãy nhập đúng định dạng số điện thoại",
                },
              ]}
            >
              <Input />
            </Form.Item>
          ) : (
            <>
              <Form.Item
                label="Mật khẩu mới"
                name="password"
                rules={[
                  {
                    required: "true",
                    message: "Hãy nhập mật khẩu mới",
                  },
                ]}
              >
                <Input.Password className="input-password" />
              </Form.Item>

              <Form.Item
                label="Nhập lại mật khẩu mới"
                name="retype"
                rules={[
                  {
                    required: "true",
                    message: "Hãy nhập lại mật khẩu mới",
                  },
                ]}
              >
                <Input.Password className="input-password" />
              </Form.Item>
            </>
          )}
        </Form>
      </FormModal>
    </div>
  );
};

export default UpdatePassword;
