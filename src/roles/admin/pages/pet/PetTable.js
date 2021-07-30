import { Table } from "antd";
import { petKeys } from "../../../../constances/data";

const PetTable = ({ dataSource, loading }) => {
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
      render: (type) => (type === petKeys.DOG ? "Chó" : "Mèo"),
    },
    {
      title: "Màu lông",
      dataIndex: "color",
      key: "color",
    },
    {
      title: "Ngày cứu trợ",
      dataIndex: "createAt",
      key: "createAt",
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
