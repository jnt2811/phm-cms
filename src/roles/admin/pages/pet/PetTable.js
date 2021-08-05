import { Button, Col, Row, Table } from "antd";
import moment from "moment";
import { isEmptyData } from "../../../../utils";
import { EditOutlined, InfoOutlined } from "@ant-design/icons";

const PetTable = ({ dataSource, loading, onViewPet, onEditPet }) => {
  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Loài",
      dataIndex: "type",
      key: "type",
    },
    {
      title: "Ngày cứu trợ",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => moment(createAt).utc().format("DD/MM/YYYY"),
    },
    {
      title: "Người cứu trợ",
      dataIndex: "volunteer",
      key: "volunteer",
      render: (volunteer) =>
        !isEmptyData(volunteer) ? volunteer.name : "Admin",
    },
    {
      title: "",
      dataIndex: "id",
      key: "id",
      render: (id, pet) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              className="blue-btn"
              icon={<InfoOutlined />}
              onClick={() => onViewPet(pet)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="green-btn"
              icon={<EditOutlined />}
              onClick={() => onEditPet(pet)}
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

export default PetTable;
