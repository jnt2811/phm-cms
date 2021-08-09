import { Button, Col, Row, Table } from "antd";
import { CloseOutlined, FormOutlined } from "@ant-design/icons";
import moment from "moment";

const AppointmentTable = ({
  loading,
  dataSource,
  onNewReport,
  onDeleteAppointment,
}) => {
  const columns = [
    {
      title: "Tên vật nuôi",
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
      title: "Thời gian đặt khám",
      dataIndex: "date",
      key: "date",
      render: (date) => moment(date).utc().format("DD/MM/YYYY HH:mm"),
    },
    // {
    //   title: "Người đặt khám",
    //   dataIndex: "volunteer",
    //   key: "volunteer",
    // },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, appointment) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              icon={<FormOutlined style={{ marginLeft: "2px" }} />}
              className="green-btn"
              onClick={() => onNewReport(appointment)}
            ></Button>
          </Col>

          <Col>
            <Button
              icon={<CloseOutlined />}
              className="cancel-btn"
              onClick={() => onDeleteAppointment(appointment)}
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

export default AppointmentTable;
