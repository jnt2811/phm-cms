import { Button, Col, Row, Table } from "antd";
import { InfoOutlined } from "@ant-design/icons";
import moment from "moment";

const ReportTable = ({ loading, dataSource, onViewReport }) => {
  const columns = [
    {
      title: "Tên vật nuôi",
      dataIndex: "pet",
      key: "pet",
      render: (pet) => <>{pet && pet.name}</>,
    },
    {
      title: "Tên phòng khám",
      dataIndex: "clinic",
      key: "clinic",
      render: (clinic) => <>{clinic && clinic.name}</>,
    },
    {
      title: "Thời gian hoàn thành",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => moment(createAt).utc().format("DD/MM/YYYY HH:mm"),
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, report) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              className="blue-btn"
              icon={<InfoOutlined />}
              onClick={() => onViewReport(report)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Table
      loading={loading}
      columns={columns}
      dataSource={dataSource}
      pagination={false}
    />
  );
};

export default ReportTable;
