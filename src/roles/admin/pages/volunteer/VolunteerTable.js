import {
  CalendarOutlined,
  EditOutlined,
  InfoOutlined,
  SyncOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { GreenTag, RedTag } from "../../../../commons/commonTag/CommonTag";
import { formatPhone } from "../../../../utils";

const VolunteerTable = ({
  loading = false,
  dataSource,
  onViewVolunteer,
  onEditVolunteer,
  onSwitchCollab,
  onUpdateAuth,
  onUpdateSchedule,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Giới tính",
      dataIndex: "gender",
      key: "gender",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => formatPhone(phone),
    },
    {
      title: "Trạng thái",
      dataIndex: "collab",
      key: "collab",
      render: (collab) =>
        collab ? <GreenTag>Đang làm</GreenTag> : <RedTag>Nghỉ làm</RedTag>,
    },
    {
      title: "",
      dataIndex: "collab",
      key: "collab",
      render: (collab, record) => (
        <Row gutter={[{ lg: 10 }, { lg: 10 }]}>
          <Col>
            <Button
              className="blue-btn"
              icon={<InfoOutlined />}
              onClick={() => onViewVolunteer(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="green-btn"
              icon={<EditOutlined />}
              disabled={!collab}
              onClick={() => onEditVolunteer(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              icon={<SyncOutlined />}
              onClick={() => onSwitchCollab(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="red-btn"
              icon={<UnlockOutlined />}
              disabled={!collab}
              onClick={() => onUpdateAuth(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="white-btn"
              icon={<CalendarOutlined />}
              disabled={!collab}
              onClick={() => onUpdateSchedule(record)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      loading={loading}
    />
  );
};

export default VolunteerTable;
