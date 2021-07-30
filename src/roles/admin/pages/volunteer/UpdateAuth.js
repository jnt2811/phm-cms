import { Input, notification, Form, Radio } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doUpdateAuthVolunteer } from "../../../../ducks/slices/volunteerSlice";

const UpdateAuth = ({ volunteer, visible, setVisible }) => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [isPhoneSelected, setIsPhoneSelected] = useState(true);

  useEffect(() => {
    const { isOk, message } = volunteerReducer;

    const successMessage = successMessages.UPDATE_AUTH_VOLUNTEER;
    const failMessage = failMessages.UPDATE_AUTH_VOLUNTEER;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      form.resetFields();
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerReducer]);

  const onOk = () => {
    form.submit();
  };

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    let requestData = {
      id: volunteer.id,
    };

    if (!isPhoneSelected) {
      if (values.password !== values.retype) {
        form.setFields([
          { name: "retype", errors: ["Mật khẩu gõ lại không khớp"] },
        ]);
      } else {
        requestData.password = values.password;
        dispatch(doUpdateAuthVolunteer(requestData));
        notification.open({ message: "Đang xử lý..." });
      }
    } else {
      requestData.phone = values.phone;
      dispatch(doUpdateAuthVolunteer(requestData));
      notification.open({ message: "Đang xử lý..." });
    }
  };

  return (
    <div className="update-auth-volunteer">
      <FormModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Cập nhật"
        cancelText="Quay lại"
        // width={800}
      >
        <h1>Cập nhật xác thực</h1>

        <h3>Tình nguyện viên: {volunteer && volunteer.name}</h3>

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

export default UpdateAuth;
