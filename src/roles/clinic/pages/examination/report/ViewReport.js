import { Avatar, Col, Divider, Image, Row, Table } from "antd";
import { InfoModal } from "../../../../../commons/commonModal/CommonModal";
import { isEmptyData } from "../../../../../utils";
import moment from "moment";
import { useEffect, useState } from "react";
import DogFb from "../../../../../assets/dog_fallback.svg";
import CatFb from "../../../../../assets/cat_fallback.svg";

const ViewReport = ({ reportData, visible, setVisible }) => {
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
    if (!isEmptyData(reportData)) {
      let count = 0;
      let vaccineList = isEmptyData(reportData.vaccines)
        ? []
        : JSON.parse(reportData.vaccines).map((item) => {
            count++;
            return {
              ...item,
              stt: count,
              key: count,
            };
          });

      count = 0;
      let alleryList = isEmptyData(reportData.allergies)
        ? []
        : JSON.parse(reportData.allergies).map((item) => {
            count++;
            return {
              ...item,
              stt: count,
              key: count,
            };
          });

      count = 0;
      let diagnosisList = isEmptyData(reportData.diagnosis)
        ? []
        : JSON.parse(reportData.diagnosis).map((item) => {
            count++;
            return {
              ...item,
              stt: count,
              key: count,
            };
          });

      count = 0;
      let surgeryList = isEmptyData(reportData.surgeries)
        ? []
        : JSON.parse(reportData.surgeries).map((item) => {
            count++;
            return {
              ...item,
              stt: count,
              key: count,
            };
          });

      count = 0;
      let prescriptionList = isEmptyData(reportData.prescription)
        ? []
        : JSON.parse(reportData.prescription).map((item) => {
            count++;
            return {
              ...item,
              stt: count,
              key: count,
            };
          });

      setReport({
        ...reportData,
        images: JSON.parse(reportData.images),
        vaccines: vaccineList,
        allergies: alleryList,
        diagnosis: diagnosisList,
        surgeries: surgeryList,
        prescription: prescriptionList,
      });
    }
  }, [reportData]);

  return (
    <div className="view-report">
      <InfoModal
        visible={visible}
        onClose={() => setVisible(false)}
        width={1000}
      >
        {report && (
          <>
            <h1>Báo cáo sức khỏe</h1>

            <br />

            <Row>
              <Col flex="400px">
                <Row align="middle" gutter={{ sm: 20 }}>
                  <Col>
                    <Avatar
                      size={100}
                      icon={
                        <div
                          style={{
                            display: "flex",
                            alignItems: "center",
                            justifyContent: "center",
                            height: "100%",
                            width: "100%",
                          }}
                        >
                          <img
                            src={
                              report.pet.type === "Chó"
                                ? DogFb
                                : report.pet.type === "Chó"
                                ? CatFb
                                : ""
                            }
                            alt=""
                            style={{
                              width: "60px",
                              height: "60px",
                              objectFit: "cover",
                            }}
                          />
                        </div>
                      }
                      src={!isEmptyData(report.pet.avatar) && report.pet.avatar}
                    />
                  </Col>

                  <Col>
                    <p style={{ margin: "10px 0" }}>
                      Tên vật nuôi: <strong>{report.pet.name}</strong>
                    </p>

                    <p style={{ margin: "10px 0" }}>
                      Loài: <strong>{report.pet.type}</strong>
                    </p>

                    <p style={{ margin: "10px 0" }}>
                      Giới tính: <strong>{report.pet.gender}</strong>
                    </p>

                    <p style={{ margin: "10px 0" }}>
                      Màu lông: <strong>{report.pet.color}</strong>
                    </p>
                  </Col>
                </Row>
              </Col>

              <Col flex="auto">
                <p style={{ margin: "10px 0" }}>
                  Tình trạng tổng quan: <strong>{report.overall}</strong>
                </p>

                <p style={{ margin: "10px 0" }}>
                  Cân nặng: <strong>{report.weight} kg</strong>
                </p>

                <p style={{ margin: "10px 0" }}>
                  Thời gian khám:{" "}
                  <strong>
                    {moment(report.createAt).utc().format("DD/MM/YYYY HH:mm")}
                  </strong>
                </p>

                <p style={{ margin: "10px 0" }}>
                  Phòng khám: <strong>{report.clinic.name}</strong>
                </p>

                <p style={{ margin: "10px 0" }}>
                  Lời dặn: <strong>{report.note}</strong>
                </p>
              </Col>
            </Row>

            <Divider />

            <h3>Hình ảnh</h3>
            <Row className="gallery" gutter={{ lg: 20 }}>
              {!isEmptyData(report.images) &&
                report.images.map((image) => (
                  <Col key={image}>
                    <Image
                      src={image}
                      width="100px"
                      height="100px"
                      style={{
                        borderRadius: "20px",
                        objectFit: "cover",
                        objectPosition: "center",
                      }}
                    />
                  </Col>
                ))}
            </Row>

            <Divider />

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
                  dataSource={
                    !isEmptyData(report.diagnosis) && report.diagnosis
                  }
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
                  dataSource={
                    !isEmptyData(report.allergies) && report.allergies
                  }
                  pagination={false}
                  size="small"
                />
              </Col>

              <Col span={12}>
                <h3>Phẫu thuật</h3>
                <Table
                  columns={columns_surgery}
                  dataSource={
                    !isEmptyData(report.surgeries) && report.surgeries
                  }
                  pagination={false}
                  size="small"
                />
              </Col>
            </Row>

            <br />

            <h3>Đơn thuốc</h3>
            <Table
              columns={columns_prescription}
              dataSource={
                !isEmptyData(report.prescription) && report.prescription
              }
              pagination={false}
              size="small"
            />
            <br />
          </>
        )}
      </InfoModal>
    </div>
  );
};

export default ViewReport;
