import { UserOutlined } from "@ant-design/icons";
import { Avatar } from "antd";
import { InfoModal } from "../../../../commons/commonModal/CommonModal";
import { formatPhone } from "../../../../utils";
import moment from "moment";

const ViewVolunteer = ({ volunteer, visible, onClose }) => {
  return (
    <div className="view-volunteer">
      <InfoModal visible={visible} onClose={onClose} width={400}>
        {volunteer && (
          <>
            <div style={{ textAlign: "center" }}>
              <br />

              <Avatar
                size={100}
                icon={<UserOutlined />}
                src={volunteer.avatar}
              />

              <br />
              <br />

              <h1>{volunteer.name}</h1>
              <h4>- {volunteer.role} -</h4>

              <br />
            </div>

            <div>
              <p>
                Ngày sinh: <strong>{volunteer.dob}</strong>
              </p>

              <p>
                Giới tính: <strong>{volunteer.gender}</strong>
              </p>

              <p>
                SĐT: <strong>{formatPhone(volunteer.phone)}</strong>
              </p>

              <p>
                Email: <strong>{volunteer.email}</strong>
              </p>

              <p>
                Địa chỉ: <strong>{volunteer.address}</strong>
              </p>

              <p>
                Trạng thái:{" "}
                <strong>{volunteer.collab ? "Đang làm" : "Nghỉ làm"}</strong>
              </p>

              {volunteer.collab ? (
                <p>
                  {" "}
                  Ngày vào làm:{" "}
                  <strong>
                    {moment(volunteer.createAt).utc().format("DD/MM/YYYY")}
                  </strong>
                </p>
              ) : (
                <p>
                  {" "}
                  Ngày nghỉ làm:{" "}
                  <strong>
                    {moment(volunteer.updateAt).utc().format("DD/MM/YYYY")}
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

export default ViewVolunteer;
