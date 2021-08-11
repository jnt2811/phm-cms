import { useSelector } from "react-redux";
import { useHistory } from "react-router-dom";
import "./exportReport.scss";
import pathNames from "../../router/pathNames";
import Avatar from "antd/lib/avatar/avatar";
import { Col, Row, Table } from "antd";
import { Scatter } from "react-chartjs-2";
import { useEffect, useState } from "react";
import moment from "moment";
import Logo from "../../assets/pug.png";

const ExportReport = () => {
  const { selectedReport } = useSelector((state) => state.pet);
  const history = useHistory();

  if (!selectedReport) {
    history.push(pathNames.MAIN);
  }

  const [list, setList] = useState({
    vaccines: [],
    diagnosis: [],
    allergies: [],
    surgeries: [],
    prescription: [],
  });

  useEffect(() => {
    let count = 0;
    let tempVaccines = [];
    let tempDiagnosis = [];
    let tempAllergies = [];
    let tempSurgeries = [];
    let tempPrescription = [];

    selectedReport.reports.forEach((report) => {
      tempVaccines = [
        ...tempVaccines,
        ...report.vaccines.map((vaccine) => ({
          ...vaccine,
          stt: ++count,
          date: moment(report.createAt).format("DD/MM/YYYY"),
        })),
      ];
    });

    count = 0;
    selectedReport.reports.forEach((report) => {
      tempDiagnosis = [
        ...tempDiagnosis,
        ...report.diagnosis.map((diagnosis) => ({
          ...diagnosis,
          stt: ++count,
          date: moment(report.createAt).format("DD/MM/YYYY"),
        })),
      ];
    });

    count = 0;
    selectedReport.reports.forEach((report) => {
      tempAllergies = [
        ...tempAllergies,
        ...report.allergies.map((allergy) => ({
          ...allergy,
          stt: ++count,
          date: moment(report.createAt).format("DD/MM/YYYY"),
        })),
      ];
    });

    count = 0;
    selectedReport.reports.forEach((report) => {
      tempSurgeries = [
        ...tempSurgeries,
        ...report.surgeries.map((surgery) => ({
          ...surgery,
          stt: ++count,
          date: moment(report.createAt).format("DD/MM/YYYY"),
        })),
      ];
    });

    count = 0;
    selectedReport.reports.forEach((report) => {
      tempPrescription = [
        ...tempPrescription,
        ...report.prescription.map((prescription) => ({
          ...prescription,
          stt: ++count,
          date: moment(report.createAt).format("DD/MM/YYYY"),
        })),
      ];
    });

    setList({
      vaccines: tempVaccines,
      diagnosis: tempDiagnosis,
      allergies: tempAllergies,
      surgeries: tempSurgeries,
      prescription: tempPrescription,
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  const labelWeight = [
    "",
    ...selectedReport.reports.map((report) =>
      moment(report.createAt).format("DD/MM/YYYY")
    ),
  ];

  const dataWeight = {
    labels: labelWeight,
    datasets: [
      {
        type: "line",
        label: "Cân nặng (kg)",
        backgroundColor: "red",
        borderColor: "red",
        data: [
          0,
          ...selectedReport.reports.map((report) => parseInt(report.weight)),
        ],
        borderWidth: 2,
      },
    ],
  };

  const columns_vaccine = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Tên vaccine", dataIndex: "name", key: "name" },
    { title: "Ngày tiêm", dataIndex: "date", key: "date" },
  ];
  const columns_diagnosis = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Tên bệnh", dataIndex: "name", key: "name" },
    { title: "Ngày chẩn đoán", dataIndex: "date", key: "date" },
  ];
  const columns_allergy = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Loại dị ứng", dataIndex: "name", key: "name" },
    { title: "Ngày xác định", dataIndex: "date", key: "date" },
  ];
  const columns_surgery = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Loại phẫu thuật", dataIndex: "name", key: "name" },
    { title: "Ngày thực hiện", dataIndex: "date", key: "date" },
  ];
  const columns_prescription = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Tên thuốc", dataIndex: "name", key: "name" },
    { title: "Chỉ định", dataIndex: "instruction", key: "instruction" },
    { title: "Ngày chỉ định", dataIndex: "date", key: "date" },
  ];

  return (
    <div className="export-report">
      <div className="container">
        <div className="big">
          <Row justify="space-between">
            <Col>
              <Row align="middle">
                <div className="line"></div>

                <div className="text">
                  <h1>BÁO CÁO SỨC KHỎE VẬT NUÔI</h1>

                  <h2>Nhà cứu trợ chó mèo</h2>
                </div>
              </Row>
            </Col>

            <Col>
              <img src={Logo} alt="" />
            </Col>
          </Row>
        </div>

        <div className="small">Thông tin cơ bản</div>

        <br />
        <Row gutter={{ sm: 50 }}>
          <Col></Col>

          <Col>
            <Avatar src={selectedReport.avatar} size={150} />
          </Col>

          <Col>
            <p>Tên: {selectedReport.name}</p>
            <p>Loài: {selectedReport.type}</p>
            <p>Giới tính: {selectedReport.gender}</p>
            <p>Màu lông: {selectedReport.color}</p>
          </Col>
        </Row>

        <div className="small">Cân nặng</div>
        <Scatter data={dataWeight} />
        <br />

        <div className="small">Tiêm vaccine</div>
        <br />
        <Table
          dataSource={list.vaccines}
          columns={columns_vaccine}
          pagination={false}
        />
        <br />

        <div className="small">Chẩn đoán bệnh</div>
        <br />
        <Table
          dataSource={list.diagnosis}
          columns={columns_diagnosis}
          pagination={false}
        />
        <br />

        <div className="small">Dị ứng</div>
        <br />
        <Table
          dataSource={list.allergies}
          columns={columns_allergy}
          pagination={false}
        />
        <br />

        <div className="small">Phẫu thuật</div>
        <br />
        <Table
          dataSource={list.surgeries}
          columns={columns_surgery}
          pagination={false}
        />
        <br />

        <div className="small">Đơn thuốc</div>
        <br />
        <Table
          dataSource={list.prescription}
          columns={columns_prescription}
          pagination={false}
        />
      </div>
    </div>
  );
};

export default ExportReport;
