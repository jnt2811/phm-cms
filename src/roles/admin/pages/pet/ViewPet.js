import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Image, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import {
  doGetPet,
  resetPet,
  setSelectedReport as setReport,
} from "../../../../ducks/slices/petSlice";
import pathNames from "../../../../router/pathNames";
import "./viewPet.scss";
import moment from "moment";
import { isEmptyData } from "../../../../utils";
import DogFb from "../../../../assets/dog_fallback.svg";
import CatFb from "../../../../assets/cat_fallback.svg";
import DetailReport from "./DetailReport";

const ViewPet = () => {
  const { id } = useParams();
  const history = useHistory();

  const petReducer = useSelector((state) => state.pet);
  const dispatch = useDispatch();

  const [pet, setPet] = useState({
    avatar: null,
    name: null,
    type: null,
    color: null,
    description: null,
    createAt: null,
    volunteer: {
      name: null,
    },
    reports: [],
  });
  const [selectedReport, setSelectedReport] = useState(null);
  const [visibleModal, setVisibleModal] = useState(false);

  useEffect(() => {
    dispatch(doGetPet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (petReducer.isOk === true) {
      const pet = petReducer.petList[0];
      let tempReports = [...pet.reports];

      tempReports = tempReports.reverse().map((report) => ({
        ...report,
        images: JSON.parse(report.images),
        vaccines: JSON.parse(report.vaccines),
        allergies: JSON.parse(report.allergies),
        surgeries: JSON.parse(report.surgeries),
        prescription: JSON.parse(report.prescription),
        diagnosis: JSON.parse(report.diagnosis),
      }));

      setPet({
        ...pet,
        reports: tempReports,
      });

      dispatch(resetPet(id));
    } else if (petReducer.isOk === false) {
      console.log(petReducer.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petReducer]);

  const handleExport = () => {
    dispatch(setReport(pet));
    history.push(pathNames.EXPORT_REPORT);
  };

  return (
    <div className="view-pet">
      <Row justify="space-between">
        <Col>
          <Row gutter={{ sm: 10 }} align="middle">
            <Col>
              <Button
                onClick={() => history.push(pathNames.ADMIN_PET)}
                icon={<ArrowLeftOutlined />}
                className="back-btn"
              ></Button>
            </Col>

            <Col>
              <h1>Chi tiết vật nuôi</h1>
            </Col>
          </Row>
        </Col>

        <Col>
          <Button onClick={handleExport}>Xuất báo cáo</Button>
        </Col>
      </Row>

      <br />
      <br />

      <Row gutter={{ sm: 50 }}>
        <Col span={8}>
          <div className="info">
            <div style={{ textAlign: "center" }}>
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
                        pet.type === "Chó"
                          ? DogFb
                          : pet.type === "Chó"
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
                src={!isEmptyData(pet.avatar) && pet.avatar}
              />

              <br />

              <h1>{pet.name}</h1>
              <h4>- {pet.type} -</h4>
            </div>

            <div>
              <p>
                Giới tính: <strong>{pet.gender}</strong>
              </p>

              <p>
                Màu lông: <strong>{pet.color}</strong>
              </p>

              <p>
                Nơi tìm thấy: <strong>{pet.location}</strong>
              </p>

              <p>
                Ngày cứu trợ:{" "}
                <strong>
                  {moment(pet.createAt).utc().format("DD/MM/YYYY")}
                </strong>
              </p>

              <p>
                Người cứu trợ:{" "}
                <strong>
                  {!isEmptyData(pet.volunteer) ? pet.volunteer.name : "Admin"}
                </strong>
              </p>
            </div>
          </div>
        </Col>

        <Col span={16}>
          <h2>Báo cáo sức khỏe</h2>

          <br />

          {pet.reports.map((report) => (
            <div className="report" key={report.id}>
              <Row justify="space-between" align="middle">
                <h3>
                  Ngày{" "}
                  {moment(report.createAt).utc().format("DD/MM/YYYY HH:mm")}
                </h3>

                <Button
                  onClick={() => {
                    setSelectedReport(report);
                    setVisibleModal(true);
                  }}
                  className="report-btn"
                >
                  Chi tiết
                </Button>
              </Row>

              <Divider className="divider" />

              <p>
                Phòng khám: <strong>{report.clinic.name}</strong>
              </p>

              <p>
                Tình trạng tổng quan: <strong>{report.overall}</strong>
              </p>

              <p>
                Cân nặng: <strong>{report.weight} kg</strong>
              </p>

              <p>
                Lời dặn: <strong>{report.note}</strong>
              </p>

              <Row className="gallery" gutter={{ sm: 10 }}>
                {!isEmptyData(report.images) &&
                  report.images.map((image) => (
                    <Col key={image}>
                      <Image src={image} style={{ borderRadius: "20px" }} />
                    </Col>
                  ))}
              </Row>
            </div>
          ))}
        </Col>
      </Row>

      <DetailReport
        reportList={selectedReport}
        onClose={() => setVisibleModal(false)}
        visible={visibleModal}
      />
    </div>
  );
};

export default ViewPet;
