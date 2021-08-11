import { Input, Form, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useSelector } from "react-redux";
import { FormModal } from "../../commons/commonModal/CommonModal";
import { firestore } from "../../firebase";

const NewRoom = ({ visible, setVisible }) => {
  const { currentUser, userList = [] } = useSelector((state) => state.chat);
  const [form] = useForm();

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    const data = {
      ...values,
    };

    firestore
      .collection("rooms")
      .add(data)
      .then(() => {
        console.log("Room created!");
        form.resetFields();
        setVisible(false);
      });
  };

  return (
    <FormModal
      visible={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      okText="Tạo mới"
      cancelText="Hủy bỏ"
    >
      <h1>Tạo phòng</h1>

      <br />

      <Form form={form} layout="vertical" onFinish={onFinish}>
        <Form.Item
          label="Tên phòng"
          name="name"
          rules={[{ required: true, message: "Hãy nhập tên phòng" }]}
        >
          <Input />
        </Form.Item>

        <Form.Item
          label="Thêm thành viên"
          name="members"
          rules={[{ required: true, message: "Hãy chọn ít nhất 1 thành viên" }]}
          initialValue={[currentUser && currentUser.uid]}
        >
          <Select mode="multiple" showSearch={false} showArrow>
            {userList.map((user) => (
              <Select.Option
                key={user.id}
                value={user.uid}
                disabled={currentUser && currentUser.uid === user.uid}
              >
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </FormModal>
  );
};

export default NewRoom;
