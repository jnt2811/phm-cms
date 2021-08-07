import { Col, Divider, Image, Row } from "antd";
import { InfoModal } from "../../../../../commons/commonModal/CommonModal";
import { isEmptyData } from "../../../../../utils";
import moment from "moment";

const ViewReport = ({ report, visible, setVisible }) => {
  return (
    <div className="view-report">
      <InfoModal visible={visible} onClose={() => setVisible(false)}>
        {report && (
          <>
            <h1>Báo cáo sức khỏe</h1>

            <br />

            <p>
              Tên vật nuôi: <strong>{report.pet.name}</strong>
            </p>

            <p>
              Loài: <strong>{report.pet.type}</strong>
            </p>

            <Divider />

            <p>
              Cân nặng: <strong>{report.weight} kg</strong>
            </p>

            <p>
              Ngày khám:{" "}
              <strong>
                {moment(report.createAt).utc().format("DD/MM/YYYY HH:mm")}
              </strong>
            </p>

            <p>
              Phòng khám: <strong>{report.clinic.name}</strong>
            </p>

            <p>
              Ghi chú: <strong>{report.note}</strong>
            </p>

            <Divider />

            <Row className="gallery" gutter={{ lg: 20 }}>
              {!isEmptyData(report.images) &&
                report.images.map((image) => (
                  <Col key={image.id}>
                    <Image
                      width={100}
                      src={image.url}
                      style={{ borderRadius: "20px" }}
                    />
                  </Col>
                ))}
            </Row>
          </>
        )}
      </InfoModal>
    </div>
  );
};

export default ViewReport;
