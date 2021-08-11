import { Col, Row } from "antd";
import { useDispatch, useSelector } from "react-redux";
import { setSelectedRoom } from "../../ducks/slices/chatSlice";

const RoomList = () => {
  const { roomList = [], selectedRoom = { id: "" } } = useSelector(
    (state) => state.chat
  );
  const dispatch = useDispatch();

  return (
    <div className="room-list">
      <Row className="room-list" gutter={[{}, { sm: 20 }]}>
        {roomList.map((room) => (
          <Col
            key={room.id}
            span={24}
            onClick={() => dispatch(setSelectedRoom(room))}
          >
            <div
              className={"room " + (selectedRoom.id === room.id && "active")}
            >
              <h4>{room.name}</h4>
            </div>
          </Col>
        ))}
      </Row>
    </div>
  );
};

export default RoomList;
