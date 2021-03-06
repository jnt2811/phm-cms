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
        label: "C??n n???ng (kg)",
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
    { title: "T??n vaccine", dataIndex: "name", key: "name" },
    { title: "Ng??y ti??m", dataIndex: "date", key: "date" },
  ];
  const columns_diagnosis = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "T??n b???nh", dataIndex: "name", key: "name" },
    { title: "Ng??y ch???n ??o??n", dataIndex: "date", key: "date" },
  ];
  const columns_allergy = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Lo???i d??? ???ng", dataIndex: "name", key: "name" },
    { title: "Ng??y x??c ?????nh", dataIndex: "date", key: "date" },
  ];
  const columns_surgery = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Lo???i ph???u thu???t", dataIndex: "name", key: "name" },
    { title: "Ng??y th???c hi???n", dataIndex: "date", key: "date" },
  ];
  const columns_prescription = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "T??n thu???c", dataIndex: "name", key: "name" },
    { title: "Ch??? ?????nh", dataIndex: "instruction", key: "instruction" },
    { title: "Ng??y ch??? ?????nh", dataIndex: "date", key: "date" },
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
                  <h1>B??O C??O S???C KH???E V???T NU??I</h1>

                  <h2>Nh?? c???u tr??? ch?? m??o</h2>
                </div>
              </Row>
            </Col>

            <Col>
              <img src={Logo} alt="" />
            </Col>
          </Row>
        </div>

        <div className="small">Th??ng tin c?? b???n</div>

        <br />
        <Row gutter={{ sm: 50 }}>
          <Col></Col>

          <Col>
            <Avatar src={selectedReport.avatar} size={150} />
          </Col>

          <Col>
            <p>T??n: {selectedReport.name}</p>
            <p>Lo??i: {selectedReport.type}</p>
            <p>Gi???i t??nh: {selectedReport.gender}</p>
            <p>M??u l??ng: {selectedReport.color}</p>
          </Col>
        </Row>

        <div className="small">C??n n???ng</div>
        <Scatter data={dataWeight} />
        <br />

        <div className="small">Ti??m vaccine</div>
        <br />
        <Table
          dataSource={list.vaccines}
          columns={columns_vaccine}
          pagination={false}
        />
        <br />

        <div className="small">Ch???n ??o??n b???nh</div>
        <br />
        <Table
          dataSource={list.diagnosis}
          columns={columns_diagnosis}
          pagination={false}
        />
        <br />

        <div className="small">D??? ???ng</div>
        <br />
        <Table
          dataSource={list.allergies}
          columns={columns_allergy}
          pagination={false}
        />
        <br />

        <div className="small">Ph???u thu???t</div>
        <br />
        <Table
          dataSource={list.surgeries}
          columns={columns_surgery}
          pagination={false}
        />
        <br />

        <div className="small">????n thu???c</div>
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
