import { Table } from "antd";
import { formatAddress, formatPhone, formatPrice } from "../../../../utils";
import moment from "moment";

const DonationTable = ({ dataSource, loading }) => {
  const columns = [
    {
      title: "Họ và tên",
      dataIndex: "donator",
      key: "name",
      render: (donator) => donator.name,
    },
    {
      title: "Số điện thoại",
      dataIndex: "donator",
      key: "phone",
      render: (donator) => formatPhone(donator.phone),
    },
    {
      title: "Địa phương",
      dataIndex: "donator",
      key: "address",
      render: (donator) => formatAddress(donator.address),
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
