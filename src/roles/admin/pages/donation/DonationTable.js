import { Table } from "antd";
import { sexKeys } from "../../../../constances/data";
import { addComma } from "../../../../utils";

const DonationTable = ({ dataSource }) => {
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      render: (sex) =>
        sex === sexKeys.MALE ? "Nam" : sexKeys.FEMALE ? "Nữ" : "Khác",
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
      render: (amount) => `${addComma(amount)} đ`,
    },
  ];

  return <Table columns={columns} dataSource={dataSource} pagination={false} />;
};

export default DonationTable;
