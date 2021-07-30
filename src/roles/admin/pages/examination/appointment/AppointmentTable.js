import { Button, Col, Row, Table } from "antd";
import { DeleteOutlined } from "@ant-design/icons";

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
              icon={<DeleteOutlined />}
              className="cancel-btn"
              onClick={() => onCancelAppointment(appointment)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default AppointmentTable;
