import { Button, Col, Row, Table } from "antd";
import { InfoOutlined } from "@ant-design/icons";

const HistoryTable = ({ dataSource, onInfoHistory }) => {
  const columns = [
    {
      title: "Tên chó mèo",
      dataIndex: "pet",
      key: "pet",
      render: (pet) => <>{pet.name}</>,
    },
    {
      title: "Tên phòng khám",
      dataIndex: "clinic",
      key: "clinic",
      render: (clinic) => <>{clinic.name}</>,
    },
    {
      title: "Thời gian hoàn thành",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, history) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              className="blue-btn"
              icon={<InfoOutlined />}
              onClick={() => onInfoHistory(history)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default HistoryTable;
