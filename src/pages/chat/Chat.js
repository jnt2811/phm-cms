import { PlusOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Row } from "antd";
import { useState } from "react";
import "./chat.scss";
import RoomList from "./RoomList";
import NewRoom from "./NewRoom";
import InviteUsers from "./InviteUsers";
import RoomHeader from "./RoomHeader";
import RoomBody from "./RoomBody";
import { useDispatch, useSelector } from "react-redux";
import { useEffect } from "react";
import { setMessageList, setSelectedRoom } from "../../ducks/slices/chatSlice";
import { firestore } from "../../firebase";

const Chat = () => {
  const { roomList, selectedRoom } = useSelector((state) => state.chat);
  const dispatch = useDispatch();

  const [visibleNewRoom, setVisibleNewRoom] = useState(false);
  const [visibleInviteUsers, setVisibleInviteUsers] = useState(false);

  // update selectedRoom right after inviting new users successfully
  useEffect(() => {
    if (roomList && selectedRoom) {
      const selectedRoom_array = roomList.filter(
        (room) => room.id === selectedRoom.id
      );

      if (selectedRoom_array.length === 1) {
        dispatch(setSelectedRoom(selectedRoom_array[0]));
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [roomList]);

  // query messages by selected room
  useEffect(() => {
    if (selectedRoom) {
      firestore
        .collection("messages")
        .where("roomId", "==", selectedRoom.id)
        .orderBy("createdAt")
        .onSnapshot((snapshot) => {
          const docs = snapshot.docs.map((doc) => ({
            ...doc.data(),
            id: doc.id,
          }));

          dispatch(setMessageList(JSON.stringify(docs)));
        });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [selectedRoom]);

  return (
    <div className="chat">
      <Row gutter={{ sm: 20 }} wrap={false}>
        <Col flex="370px">
          <div className="sider">
            <Row justify="space-between">
              <h2>Tin nhắn</h2>

              <Button
                icon={<PlusOutlined />}
                className="plus-btn"
                onClick={() => setVisibleNewRoom(true)}
              ></Button>
            </Row>

            <Divider style={{ margin: "5px 0" }} />

            <br />

            <RoomList />

            <NewRoom visible={visibleNewRoom} setVisible={setVisibleNewRoom} />
          </div>
        </Col>

        <Col flex="auto">
          <div className="chat-room">
            {selectedRoom && (
              <div className="inner">
                <RoomHeader
                  selectedRoom={selectedRoom}
                  setVisibleInviteUsers={setVisibleInviteUsers}
                />

                <RoomBody />
              </div>
            )}
          </div>
        </Col>
      </Row>

      <InviteUsers
        visible={visibleInviteUsers}
        setVisible={setVisibleInviteUsers}
      />
    </div>
  );
};

export default Chat;
