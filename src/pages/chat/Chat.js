import { Button, Col, Divider, Form, Input, Row, Select } from "antd";
import ChatRoom from "./ChatRoom";
import "./chat.scss";
import { useContext, useMemo, useState } from "react";
import { ChatContext } from "./ChatProvider";
import { PlusOutlined } from "@ant-design/icons";
import { FormModal } from "../../commons/commonModal/CommonModal";
import { useForm } from "antd/lib/form/Form";
import { firestore } from "../../firebase";
import { useEffect } from "react";
import localKeys from "../../constances/localKeys";

const Chat = () => {
  return (
    <div className="chat">
      <Row gutter={{ sm: 20 }} wrap={false}>
        <Col flex="370px">
          <ChatSider />
        </Col>

        <Col flex="auto">
          <ChatRoom />
        </Col>
      </Row>
    </div>
  );
};

export default Chat;

const ChatSider = () => {
  const { id } = JSON.parse(localStorage.getItem(localKeys.USER_DATA));
  const roomsRef = firestore.collection("rooms");

  const [rooms, setRooms] = useState([]);

  const condition = useMemo(() => {
    return {
      fieldName: "members",
      operator: "array-contains",
      compareVal: `${id}`,
    };
  }, [id]);

  useEffect(() => {
    roomsRef
      .where(condition.fieldName, condition.operator, condition.compareVal)
      .onSnapshot((snapshot) => {
        const docs = snapshot.docs.map((doc) => ({
          ...doc.data(),
          id: doc.id,
        }));

        setRooms(docs);
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [id, condition]);

  const [visibleNewModal, setVisibleNewModal] = useState(false);

  return (
    <div className="chat-sider">
      <Row justify="space-between">
        <h2>Tin nhắn</h2>

        <Button
          icon={<PlusOutlined />}
          className="plus-btn"
          onClick={() => setVisibleNewModal(true)}
        ></Button>
      </Row>

      <Divider style={{ margin: "5px 0" }} />

      <br />

      <RoomList list={rooms} />

      <NewRoomModal visible={visibleNewModal} setVisible={setVisibleNewModal} />
    </div>
  );
};

const RoomList = ({ list }) => {
  const { selectedRoomId, setSelectedRoomId } = useContext(ChatContext);

  return (
    <Row className="room-list" gutter={[{}, { sm: 20 }]}>
      {list.map((room) => (
        <Col key={room.id} span={24} onClick={() => setSelectedRoomId(room.id)}>
          <div className={"room " + (selectedRoomId === room.id && "active")}>
            <h4>{room.name}</h4>
            {/* <p>{room.newestMsg}</p> */}
          </div>
        </Col>
      ))}
    </Row>
  );
};

const NewRoomModal = ({ visible, setVisible }) => {
  const [form] = useForm();
  const { users } = useContext(ChatContext);
  const roomsRef = firestore.collection("rooms");

  const onFinish = (values) => {
    const data = {
      ...values,
      members: values.members.map((member) => JSON.parse(member).uid),
    };

    checkRoomNameExist(data.name).then((exist) => {
      if (exist) {
        form.setFields([{ name: "name", errors: ["Tên phòng đã tồn tại"] }]);
      } else {
        createNewRoom(data).then(() => {
          console.log("Room created!");
          form.resetFields();
          setVisible(false);
        });
      }
    });
  };

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const checkRoomNameExist = async (name) => {
    const docs = await roomsRef.where("name", "==", name).get();
    return docs.size !== 0;
  };

  const createNewRoom = async (data) => {
    return await roomsRef.add(data);
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
        >
          <Select mode="multiple" allowClear showSearch>
            {users.map((user) => (
              <Select.Option key={user.id} value={JSON.stringify(user)}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </FormModal>
  );
};
