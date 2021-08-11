import { Form, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";
import { FormModal } from "../../commons/commonModal/CommonModal";
import { firestore } from "../../firebase";

const InviteUsers = ({ visible, setVisible }) => {
  const { selectedRoom, userList = [] } = useSelector((state) => state.chat);
  const [form] = useForm();

  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    if (userList && selectedRoom) {
      setOptionList(
        userList.filter((user) => !selectedRoom.members.includes(user.uid))
      );
    }
  }, [selectedRoom, userList]);

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    const { members } = values;

    firestore
      .collection("rooms")
      .doc(selectedRoom.id)
      .update({
        members: [...members, ...selectedRoom.members],
      })
      .then(() => {
        console.log("Room updated");
        form.resetFields();
        setVisible(false);
      });
  };

  return (
    <div className="invite-users">
      <FormModal
        visible={visible}
        onCancel={onCancel}
        onOk={() => form.submit()}
        okText="Thêm mới"
        cancelText="Hủy bỏ"
      >
        <h1>Thêm thành viên mới</h1>

        <br />

        <Form form={form} layout="vertical" onFinish={onFinish}>
          <Form.Item
            label="Thêm thành viên"
            name="members"
            rules={[
              { required: true, message: "Hãy chọn ít nhất 1 thành viên" },
            ]}
          >
            <Select mode="multiple" allowClear showSearch={false}>
              {optionList.map((user) => (
                <Select.Option key={user.id} value={user.uid}>
                  {user.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>
        </Form>
      </FormModal>
    </div>
  );
};

export default InviteUsers;
