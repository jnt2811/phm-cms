import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { InfoModal } from "../../../../commons/commonModal/CommonModal";
import { formatPhone } from "../../../../utils";
import moment from "moment";

const ViewClinic = ({ clinic, visible, onClose }) => {
  return (
    <div className="view-clinic">
      <InfoModal visible={visible} onClose={onClose} width={400}>
        {clinic && (
          <>
            <div style={{ textAlign: "center" }}>
              <br />

              <Avatar size={100} icon={<UserOutlined />} src={clinic.avatar} />

              <br />
              <br />

              <h1>{clinic.name}</h1>
              <h4>- {clinic.role} -</h4>

              <br />
            </div>

            <div>
              <p>
                SĐT: <strong>{formatPhone(clinic.phone)}</strong>
              </p>

              <p>
                Email: <strong>{clinic.email}</strong>
              </p>

              <p>
                Địa chỉ: <strong>{clinic.address}</strong>
              </p>

              <p>
                Trạng thái:{" "}
                <strong>
                  {clinic.collab ? "Đang hợp tác" : "Dừng hợp tác"}
                </strong>
              </p>

              {clinic.collab ? (
                <p>
                  {" "}
                  Ngày hợp tác:{" "}
                  <strong>
                    {moment(clinic.createAt).utc().format("DD/MM/YYYY")}
                  </strong>
                </p>
              ) : (
                <p>
                  {" "}
                  Ngày dừng hợp tác:{" "}
                  <strong>
                    {moment(clinic.updateAt).utc().format("DD/MM/YYYY")}
                  </strong>
                </p>
              )}
            </div>
          </>
        )}
      </InfoModal>
    </div>
  );
};

export default ViewClinic;
