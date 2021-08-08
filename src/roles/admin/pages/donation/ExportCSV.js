import { CSVLink } from "react-csv";
import moment from "moment";
import { formatAddress } from "../../../../utils";

const ExportCSV = ({ donations }) => {
  const headers = [
    { key: "name", label: "Họ và tên" },
    { key: "phone", label: "Số điện thoại" },
    { key: "address", label: "Địa phương" },
    { key: "createAt", label: "Ngày quyên góp" },
    { key: "amount", label: "Số tiền" },
  ];

  const getExportData = () => {
    let data = [...donations];

    data = data.map((donation) => ({
      name: donation.donator.name,
      phone: donation.donator.phone,
      address: formatAddress(donation.donator.address),
      createAt: moment(donation.createAt).format("DD/MM/YYYY"),
      amount: donation.amount,
    }));

    let sum = 0;
    data.forEach((item) => (sum += item.amount));

    data.push({
      name: "",
      phone: "",
      address: "",
      createAt: "Tổng:",
      amount: sum,
    });

    return data;
  };

  return (
    <CSVLink
      data={getExportData()}
      headers={headers}
      filename={`Bao_cao_quyen_gop_${moment().format(
        "DD/MM/YYYY_HH:mm:ss"
      )}.csv`}
    >
      Xuất CSV
    </CSVLink>
  );
};

export default ExportCSV;
