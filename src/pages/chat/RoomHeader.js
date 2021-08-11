import { UserAddOutlined } from "@ant-design/icons";
import { Avatar, Button, Col, Divider, Popover, Row, Tooltip } from "antd";
import { useState, useEffect } from "react";
import { useSelector } from "react-redux";

const RoomHeader = ({ selectedRoom, setVisibleInviteUsers }) => {
  const { userList = [] } = useSelector((state) => state.chat);

  const [members, setMembers] = useState([]);

  useEffect(() => {
    if (userList) {
      setMembers(
        userList.filter((user) => selectedRoom.members.includes(user.uid))
      );
    }
  }, [selectedRoom, userList]);

  return (
    <div className="room-header">
      <Row justify="space-between" align="middle">
        <Col>
          <Button
            icon={<UserAddOutlined />}
            onClick={() => setVisibleInviteUsers(true)}
          >
            Mời
          </Button>
        </Col>

        <Col>
          {members.length < 3 ? (
            <Row justify="end">
              {members.map((member) => (
                <Tooltip key={member.id} title={member.name}>
                  <Avatar src={member.avatar}>{member.name}</Avatar>
                </Tooltip>
              ))}
            </Row>
          ) : (
            <Row justify="end">
              {members.slice(0, 2).map((member) => (
                <Tooltip key={member.uid} title={member.name}>
                  <Avatar src={member.avatar}>{member.name}</Avatar>
                </Tooltip>
              ))}

              <Popover
                placement="bottomLeft"
                content={members.map((member) => (
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
                <Avatar>+ {members.length - 2}</Avatar>
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
  );
};

export default RoomHeader;
