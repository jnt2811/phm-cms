import {
  EditOutlined,
  InfoOutlined,
  SyncOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { GreenTag, RedTag } from "../../../../commons/commonTag/CommonTag";

const ClinicTable = ({
  loading = false,
  dataSource,
  onViewClinic,
  onEditClinic,
  onSwitchCollab,
  onUpdatePassword,
}) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên phòng khám",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Ngày hợp tác",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Trạng thái",
      dataIndex: "collab",
      key: "collab",
      render: (collab) =>
        collab ? (
          <GreenTag>Đang hợp tác</GreenTag>
        ) : (
          <RedTag>Dừng hợp tác</RedTag>
        ),
    },
    {
      title: "",
      dataIndex: "collab",
      key: "collab",
      render: (collab, record) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              className="blue-btn"
              icon={<InfoOutlined />}
              onClick={() => onViewClinic(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="green-btn"
              icon={<EditOutlined />}
              disabled={!collab}
              onClick={() => onEditClinic(record)}
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
              onClick={() => onUpdatePassword(record)}
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

export default ClinicTable;
