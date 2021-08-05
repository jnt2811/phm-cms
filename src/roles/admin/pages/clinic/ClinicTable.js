import {
  EditOutlined,
  InfoOutlined,
  SyncOutlined,
  UnlockOutlined,
} from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { GreenTag, RedTag } from "../../../../commons/commonTag/CommonTag";
import moment from "moment";
import { formatPhone } from "../../../../utils";

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
      render: (phone) => formatPhone(phone),
    },
    {
      title: "Ngày hợp tác",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => moment(createAt).utc().format("DD/MM/YYYY"),
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
