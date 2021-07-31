import { ArrowLeftOutlined, UserOutlined } from "@ant-design/icons";
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

  useEffect(() => {
    dispatch(doGetPet(id));
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (petReducer.isOk === true) {
      console.log(petReducer.petList[0]);
      setPet(petReducer.petList[0]);
      dispatch(resetPet(id));
    } else if (petReducer.isOk === false) {
      console.log(petReducer.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petReducer]);

  return (
    <div className="view-pet">
      <Row gutter={{ sm: 10 }} align="middle">
        <Col>
          <Button
            onClick={() => history.push(pathNames.ADMIN_PET)}
            icon={<ArrowLeftOutlined />}
            className="back-btn"
          ></Button>
        </Col>

        <Col>
          <h1>Chi tiết chó mèo</h1>
        </Col>
      </Row>

      <br />
      <br />

      <Row gutter={{ sm: 50 }}>
        <Col span={8}>
          <div className="info">
            <div style={{ textAlign: "center" }}>
              <Avatar size={100} icon={<UserOutlined />} src={pet.avatar} />

              <br />

              <h1>{pet.name}</h1>
              <h4>- {pet.type} -</h4>
            </div>

            <div>
              <p>
                Màu lông: <strong>{pet.color}</strong>
              </p>

              <p>
                Ngày cứu trợ:{" "}
                <strong>
                  {moment(pet.createAt).utc().format("DD/MM/YYYY")}
                </strong>
              </p>

              <p>
                Người cứu trợ: <strong>{pet.volunteer.name}</strong>
              </p>

              <p>
                Mô tả: <strong>{pet.description}</strong>
              </p>
            </div>
          </div>
        </Col>

        <Col span={16}>
          <h2>Báo cáo sức khỏe</h2>

          <br />

          {pet.reports.map((report) => (
            <div className="report" key={report.id}>
              <h3>Ngày {moment(report.createAt).utc().format("DD/MM/YYYY")}</h3>

              <Divider className="divider" />

              <p>Phòng khám: {}</p>

              <p>
                Cân nặng: <strong>{report.weight} kg</strong>
              </p>

              <p>Ghi chú: {report.note}</p>

              <div className="gallery">
                <Image.PreviewGroup>
                  {!isEmptyData(report.images) &&
                    report.images.map((image) => (
                      <Image key={image} width={200} src={image} />
                    ))}
                </Image.PreviewGroup>
              </div>
            </div>
          ))}
        </Col>
      </Row>
    </div>
  );
};

export default ViewPet;
