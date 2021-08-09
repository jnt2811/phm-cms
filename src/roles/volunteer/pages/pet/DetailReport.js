import { InfoModal } from "../../../../commons/commonModal/CommonModal";
import { isEmptyData } from "../../../../utils";
import moment from "moment";
import { Col, Row, Table } from "antd";
import { useEffect, useState } from "react";

const DetailReport = ({ reportList, visible, onClose }) => {
  const columns_vaccine = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Tên vaccine", dataIndex: "name", key: "name" },
  ];
  const columns_diagnosis = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Tên bệnh", dataIndex: "name", key: "name" },
  ];
  const columns_allergy = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Loại dị ứng", dataIndex: "name", key: "name" },
  ];
  const columns_surgery = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Loại phẫu thuật", dataIndex: "name", key: "name" },
  ];
  const columns_prescription = [
    { title: "STT", dataIndex: "stt", key: "stt", width: "60px" },
    { title: "Tên thuốc", dataIndex: "name", key: "name" },
    { title: "Chỉ định", dataIndex: "instruction", key: "instruction" },
  ];

  const [report, setReport] = useState();

  useEffect(() => {
    if (!isEmptyData(reportList)) {
      let count = 0;
      let vaccineList = isEmptyData(reportList.vaccines)
        ? []
        : reportList.vaccines.map((item) => {
            count++;
            return {
              ...item,
              stt: count,
            };
          });

      count = 0;
      let alleryList = isEmptyData(reportList.allergies)
        ? []
        : reportList.allergies.map((item) => {
            count++;
            return {
              ...item,
              stt: count,
            };
          });

      count = 0;
      let diagnosisList = isEmptyData(reportList.diagnosis)
        ? []
        : reportList.diagnosis.map((item) => {
            count++;
            return {
              ...item,
              stt: count,
            };
          });

      count = 0;
      let surgeryList = isEmptyData(reportList.surgeries)
        ? []
        : reportList.surgeries.map((item) => {
            count++;
            return {
              ...item,
              stt: count,
            };
          });

      count = 0;
      let prescriptionList = isEmptyData(reportList.prescription)
        ? []
        : reportList.prescription.map((item) => {
            count++;
            return {
              ...item,
              stt: count,
            };
          });

      setReport({
        ...reportList,
        vaccines: vaccineList,
        allergies: alleryList,
        diagnosis: diagnosisList,
        surgeries: surgeryList,
        prescription: prescriptionList,
      });
    }
  }, [reportList]);

  if (isEmptyData(report)) return <></>;

  return (
    <InfoModal visible={visible} onClose={onClose} width={800}>
      <h1>Chi tiết báo cáo</h1>
      <h4>
        Thời gian: {moment(report.createAt).utc().format("DD/MM/YYYY HH:mm")}
      </h4>

      <br />

      <Row gutter={{ sm: 20 }}>
        <Col span={12}>
          <h3>Tiêm vaccine</h3>
          <Table
            columns={columns_vaccine}
            dataSource={!isEmptyData(report.vaccines) && report.vaccines}
            pagination={false}
            size="small"
          />
        </Col>

        <Col span={12}>
          <h3>Chẩn đoán bệnh</h3>
          <Table
            columns={columns_diagnosis}
            dataSource={!isEmptyData(report.diagnosis) && report.diagnosis}
            pagination={false}
            size="small"
          />
        </Col>
      </Row>

      <br />

      <Row gutter={{ sm: 20 }}>
        <Col span={12}>
          <h3>Dị ứng</h3>
          <Table
            columns={columns_allergy}
            dataSource={!isEmptyData(report.allergies) && report.allergies}
            pagination={false}
            size="small"
          />
        </Col>

        <Col span={12}>
          <h3>Phẫu thuật</h3>
          <Table
            columns={columns_surgery}
            dataSource={!isEmptyData(report.surgeries) && report.surgeries}
            pagination={false}
            size="small"
          />
        </Col>
      </Row>

      <br />

      <h3>Đơn thuốc</h3>
      <Table
        columns={columns_prescription}
        dataSource={!isEmptyData(report.prescription) && report.prescription}
        pagination={false}
        size="small"
      />
      <br />
    </InfoModal>
  );
};

export default DetailReport;
