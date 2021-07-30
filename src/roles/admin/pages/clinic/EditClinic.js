import { Col, Input, notification, Row, Form } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doEditClinic } from "../../../../ducks/slices/clinicSlice";

const EditClinic = ({ clinic, visible, setVisible }) => {
  const clinicReducer = useSelector((state) => state.clinic);
  const dispatch = useDispatch();

  const [form] = useForm();

  useEffect(() => {
    if (clinic) {
      form.setFieldsValue({
        name: clinic.name,
        dob: clinic.dob,
        gender: clinic.gender,
        phone: clinic.phone,
        email: clinic.email,
        address: clinic.address,
      });
    }
  }, [form, clinic]);

  useEffect(() => {
    const { isOk, message } = clinicReducer;

    const successMessage = successMessages.EDIT_NEW_CLINIC;
    const failMessage = failMessages.EDIT_NEW_CLINIC;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      form.resetFields();
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicReducer]);

  const onOk = () => {
    form.submit();
  };

  const onCancel = () => {
    setVisible(false);
    form.resetFields();
  };

  const onFinish = (values) => {
    const requestData = {
      ...values,
      id: clinic.id,
    };
    dispatch(doEditClinic(requestData));
    notification.open({ message: "Đang xử lý..." });
  };

  return (
    <div className="edit-clinic">
      <FormModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Lưu thay đổi"
        cancelText="Quay lại"
        width={800}
      >
        <h1>Chỉnh sửa phòng khám</h1>

        <br />

        <Form layout="vertical" form={form} onFinish={onFinish}>
          <Form.Item
            label="Tên phòng khám"
            name="name"
            rules={[{ required: true, message: "Hãy điền tên phòng khám" }]}
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

export default EditClinic;
