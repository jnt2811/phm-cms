import { Button, Col, Row, Table } from "antd";

const AppointmentTable = ({ dataSource, onCancelAppointment }) => {
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
      title: "Thời gian đặt khám",
      dataIndex: "datetime",
      key: "datetime",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, appointment) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              className="cancel-btn"
              onClick={() => onCancelAppointment(appointment)}
            >
              Hủy bỏ
            </Button>
          </Col>
        </Row>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default AppointmentTable;
