import { SendOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Form, Input, Row, Tooltip } from "antd";
import { useForm } from "antd/lib/form/Form";
import { formatRelative } from "date-fns";
import { createRef, useEffect } from "react";
import { useSelector } from "react-redux";
import firebase, { firestore } from "../../firebase";

const RoomBody = () => {
  const messageListRef = createRef();

  const { messageList = [], currentUser } = useSelector((state) => state.chat);

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
    <div className="room-body">
      <div className="msg-list">
        <Row gutter={[{}, { sm: 10 }]}>
          {messageList.map((message) =>
            message.uid !== currentUser.uid ? (
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

      <SendMsg />
    </div>
  );
};

export default RoomBody;

const SendMsg = () => {
  const { currentUser, selectedRoom } = useSelector((state) => state.chat);
  const [form] = useForm();

  const onFinish = (values) => {
    const { text } = values;

    if (text) {
      firestore
        .collection("messages")
        .add({
          text: text,
          uid: currentUser.uid,
          roomId: selectedRoom.id,
          avatar: currentUser.avatar,
          name: currentUser.name,
          createdAt: firebase.firestore.FieldValue.serverTimestamp(),
        })
        .then(() => {
          console.log("send message success");
          form.resetFields();
        });
    }
  };

  return (
    <div className="send-msg">
      <Form form={form} onFinish={onFinish}>
        <Row>
          <Col flex="auto">
            <Form.Item name="text" style={{ width: "100%" }}>
              <Input autoFocus={true} />
            </Form.Item>
          </Col>

          <Col flex="50px">
            <Form.Item>
              <Button
                icon={<SendOutlined />}
                className="send-btn"
                htmlType="submit"
              ></Button>
            </Form.Item>
          </Col>
        </Row>
      </Form>
    </div>
  );
};
