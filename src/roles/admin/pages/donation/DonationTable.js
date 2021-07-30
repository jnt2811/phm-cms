import { Table } from "antd";
import { formatPrice } from "../../../../utils";
import moment from "moment";

const DonationTable = ({ dataSource, loading }) => {
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
      title: "Ngày quyên góp",
      dataIndex: "createAt",
      key: "createAt",
      render: (createAt) => moment(createAt).utc().format("DD/MM/YYYY"),
    },
    {
      title: "Số tiền",
      dataIndex: "amount",
      key: "amount",
      render: (amount) => formatPrice(amount, "đ"),
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

export default DonationTable;
