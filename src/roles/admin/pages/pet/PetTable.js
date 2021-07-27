import { Table } from "antd";
import { healthStatusKeys, petKeys } from "../../../../constances/data";

const PetTable = ({ dataSource }) => {
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
      dataIndex: "rescuedAt",
      key: "rescuedAt",
    },
    {
      title: "Tình trạng",
      dataIndex: "healthStatus",
      key: "healthStatus",
      render: (healthStatus) =>
        healthStatus === healthStatusKeys.GOOD
          ? "Tốt"
          : healthStatus === healthStatusKeys.BAD
          ? "Không tốt"
          : "---",
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default PetTable;
