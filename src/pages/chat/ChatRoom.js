import { SendOutlined, UserAddOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Divider,
  Input,
  Popover,
  Row,
  Tooltip,
  Form,
  Select,
} from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useState, useContext } from "react";
import { FormModal } from "../../commons/commonModal/CommonModal";
import localKeys from "../../constances/localKeys";
import firebase, { firestore } from "../../firebase";
import { ChatContext } from "./ChatProvider";
import { formatRelative } from "date-fns";
import { createRef } from "react";
import { useMemo } from "react";

const ChatRoom = () => {
  const { selectedRoom } = useContext(ChatContext);
  const [visibleInvite, setVisibleInvite] = useState(false);
  const [inputMsg, setInputMsg] = useState();

  const handleSend = () => {
    if (inputMsg) {
      const { id, rest } = JSON.parse(
        localStorage.getItem(localKeys.USER_DATA)
      );

      firestore
        .collection("messages")
        .add({
          text: inputMsg,
          uid: id,
          roomId: selectedRoom.id,
          avatar: rest.avatar,
          name: rest.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log("send message success");
          setInputMsg();
        });
    }
  };

  return (
    <div className="chat-room">
      {selectedRoom && (
        <div className="chat-header">
          <Row justify="space-between" align="middle">
            <Col>
              <Button
                icon={<UserAddOutlined />}
                onClick={() => setVisibleInvite(true)}
              >
                Mời
              </Button>
            </Col>

            <Col>
              {selectedRoom.members.length < 3 ? (
                <Row justify="end">
                  {selectedRoom.members.map((member) => (
                    <Tooltip key={member} title={member.name}>
                      <Avatar src={member.avatar}>{member.name}</Avatar>
                    </Tooltip>
                  ))}
                </Row>
              ) : (
                <Row justify="end">
                  {selectedRoom.members.slice(0, 2).map((member) => (
                    <Tooltip key={member.uid} title={member.name}>
                      <Avatar src={member.avatar}>{member.name}</Avatar>
                    </Tooltip>
                  ))}

                  <Popover
                    placement="bottomLeft"
                    content={selectedRoom.members.map((member) => (
                      <div key={member.id} style={{ margin: "20px 0" }}>
                        <Row align="middle">
                          <Avatar
                            src={member.avatar}
                            style={{ marginRight: "5px" }}
                          >
                            {member.name}
                          </Avatar>
                          {member.name}
                        </Row>
                      </div>
                    ))}
                  >
                    <Avatar>+ {selectedRoom.members.length - 2}</Avatar>
                  </Popover>
                </Row>
              )}
            </Col>
          </Row>

          <div style={{ textAlign: "center", marginTop: "-38px" }}>
            <h3 style={{ margin: 0 }}>{selectedRoom.name}</h3>
          </div>

          <Divider style={{ margin: "20px 0" }} />
        </div>
      )}

      {selectedRoom && (
        <div className="chat-wrap">
          <ChatMessages />

          <div className="chat-input">
            <Divider style={{ margin: "1px 0 20px 0" }} />

            <Row justify="space-between">
              <Col flex="auto">
                <Input
                  value={inputMsg}
                  onChange={(e) => setInputMsg(e.target.value)}
                  onKeyUp={(e) => e.keyCode === 13 && handleSend()}
                />
              </Col>

              <Col flex="50px">
                <Button
                  icon={<SendOutlined />}
                  className="send-btn"
                  onClick={handleSend}
                ></Button>
              </Col>
            </Row>
          </div>
        </div>
      )}

      <InviteModal visible={visibleInvite} setVisible={setVisibleInvite} />
    </div>
  );
};

export default ChatRoom;

const ChatMessages = () => {
  const { id } = JSON.parse(localStorage.getItem(localKeys.USER_DATA));
  const { selectedRoom } = useContext(ChatContext);
  const messageListRef = createRef();

  const [messages, setMessages] = useState([]);

  const condition = useMemo(() => {
    if (selectedRoom) {
      return {
        fieldName: "roomId",
        operator: "==",
        compareVal: selectedRoom.id,
      };
    }
  }, [selectedRoom]);

  useEffect(() => {
    if (!condition.compareValue || !condition.compareValue.length) {
      const unsubscribe = firestore
        .collection("messages")
        .where(condition.fieldName, condition.operator, condition.compareVal)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          setMessages(docs);
        });

      return unsubscribe;
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  useEffect(() => {
    messageListRef.current.scrollIntoView();
  }, [messageListRef]);

  const formatTimestamp = (seconds) => {
    let formattedDate = "";

    if (seconds) {
      formattedDate = formatRelative(new Date(seconds * 1000), new Date());

      formattedDate =
        formattedDate.charAt(0).toUpperCase() + formattedDate.slice(1);
    }

    return formattedDate;
  };

  return (
    <div className="chat-msg-list">
      <Row gutter={[{}, { sm: 10 }]}>
        {messages.map((message) =>
          message.uid !== id ? (
            <Col span={24} key={message.id}>
              <div className="chat-msg-item">
                <Row align="bottom" gutter={{ sm: 10 }} wrap={false}>
                  <Col>
                    <Tooltip title={message.name}>
                      <Avatar src={message.avatar}>{message.name}</Avatar>
                    </Tooltip>
                  </Col>

                  <Col>
                    <Tooltip
                      title={
                        message.createdAt &&
                        formatTimestamp(message.createdAt.seconds)
                      }
                    >
                      <div className="content">{message.text}</div>
                    </Tooltip>
                  </Col>
                </Row>
              </div>
            </Col>
          ) : (
            <Col span={24} key={message.id}>
              <div className="chat-msg-item">
                <Row
                  align="bottom"
                  gutter={{ sm: 10 }}
                  wrap={false}
                  justify="end"
                >
                  <Col>
                    <Tooltip
                      title={
                        message.createdAt &&
                        formatTimestamp(message.createdAt.seconds)
                      }
                    >
                      <div className="content">{message.text}</div>
                    </Tooltip>
                  </Col>

                  <Col>
                    <Tooltip title={message.name}>
                      <Avatar src={message.avatar}>{message.name}</Avatar>
                    </Tooltip>
                  </Col>
                </Row>
              </div>
            </Col>
          )
        )}

        <div ref={messageListRef} />
      </Row>
    </div>
  );
};

const InviteModal = ({ visible, setVisible }) => {
  const { users, selectedRoom } = useContext(ChatContext);
  const [form] = useForm();

  const [optionList, setOptionList] = useState([]);

  useEffect(() => {
    if (selectedRoom) {
      let tempList = [...users];
      let memberList = [...selectedRoom.members];

      tempList = tempList.filter((item) => !memberList.includes(item.uid));

      setOptionList(tempList);
    }
  }, [selectedRoom, users, visible]);

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    const data = values.members.map((member) => JSON.parse(member));
    console.log(data);

    firestore
      .collection("rooms")
      .doc(selectedRoom.id)
      .update({
        members: [...data, ...selectedRoom.members],
      })
      .then(() => {
        console.log("Room updated");
        form.resetFields();
        setVisible(false);
      });
  };

  return (
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
          rules={[{ required: true, message: "Hãy chọn ít nhất 1 thành viên" }]}
        >
          <Select mode="multiple" allowClear showSearch>
            {optionList.map((user) => (
              <Select.Option key={user.id} value={JSON.stringify(user.uid)}>
                {user.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </FormModal>
  );
};
