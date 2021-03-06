import { ArrowLeftOutlined } from "@ant-design/icons";
import { Button, Col, Divider, Image, Row } from "antd";
import Avatar from "antd/lib/avatar/avatar";
import { useState } from "react";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { useHistory, useParams } from "react-router-dom";
import { doGetPet, resetPet } from "../../../../ducks/slices/petSlice";
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

  return (
    <div className="view-pet">
      <Row justify="space-between">
        <Col>
          <Row gutter={{ sm: 10 }} align="middle">
            <Col>
              <Button
                onClick={() => history.push(pathNames.VOLUNTEER_PET)}
                icon={<ArrowLeftOutlined />}
                className="back-btn"
              ></Button>
            </Col>

            <Col>
              <h1>Chi ti???t v???t nu??i</h1>
            </Col>
          </Row>
        </Col>

        <Col>{/* <Button>Xu???t b??o c??o</Button> */}</Col>
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
                        pet.type === "Ch??"
                          ? DogFb
                          : pet.type === "Ch??"
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
                Gi???i t??nh: <strong>{pet.gender}</strong>
              </p>

              <p>
                M??u l??ng: <strong>{pet.color}</strong>
              </p>

              <p>
                N??i t??m th???y: <strong>{pet.location}</strong>
              </p>

              <p>
                Ng??y c???u tr???:{" "}
                <strong>
                  {moment(pet.createAt).utc().format("DD/MM/YYYY")}
                </strong>
              </p>

              <p>
                Ng?????i c???u tr???:{" "}
                <strong>
                  {!isEmptyData(pet.volunteer) ? pet.volunteer.name : "Admin"}
                </strong>
              </p>

              <p>
                T??nh tr???ng l??c ???????c c???u: <strong>{pet.description}</strong>
              </p>
            </div>
          </div>
        </Col>

        <Col span={16}>
          <h2>B??o c??o s???c kh???e</h2>

          <br />

          {pet.reports.map((report) => (
            <div className="report" key={report.id}>
              <Row justify="space-between" align="middle">
                <h3>
                  Ng??y{" "}
                  {moment(report.createAt).utc().format("DD/MM/YYYY HH:mm")}
                </h3>

                <Button
                  onClick={() => {
                    setSelectedReport(report);
                    setVisibleModal(true);
                  }}
                  className="report-btn"
                >
                  Chi ti???t
                </Button>
              </Row>

              <Divider className="divider" />

              <p>
                Ph??ng kh??m: <strong>{report.clinic.name}</strong>
              </p>

              <p>
                T??nh tr???ng t???ng quan: <strong>{report.overall}</strong>
              </p>

              <p>
                C??n n???ng: <strong>{report.weight} kg</strong>
              </p>

              <p>
                L???i d???n: <strong>{report.note}</strong>
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
