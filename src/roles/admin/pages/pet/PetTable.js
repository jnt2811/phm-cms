import { Table } from "antd";
import { petKeys } from "../../../../constances/data";

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
      render: (type) => type === petKeys.DOG,
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
    },
    {
      title: "Ngày quyên góp",
      dataIndex: "createdAt",
      key: "createdAt",
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default PetTable;
