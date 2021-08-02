import { Avatar, Button, Divider } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import "./account.scss";
import { useState } from "react";
import EditInfo from "./EditInfo";
import ScheduleTable from "./ScheduleTable";
import UpdatePass from "./UpdatePass";

const Account = () => {
  const [visibleEditModal, setVisibleEditModal] = useState(false);

  return (
    <div className="account">
      <h1>Xin chào, Tình nguyện viên</h1>

      <br />
      <br />

      <div className="row">
        <div className="col col-1">
          <div style={{ textAlign: "center" }}>
            <Avatar size={120} icon={<UserOutlined />} />

            <br />
            <br />

            <h2>Tình nguyện viên</h2>
            <h4>- Tình nguyện viên -</h4>
          </div>

          <br />

          <p>
            Ngày sinh: <strong>28/11/2000</strong>
          </p>

          <p>
            Giới tính: <strong>Nam</strong>
          </p>

          <p>
            Địa chỉ:{" "}
            <strong>Lê Văn Thiêm, Thanh Xuân Trung, Thanh Xuân, Hà Nội</strong>
          </p>

          <p>
            Số điện thoại: <strong>0123456789</strong>
          </p>

          <p>
            Email: <strong>tnv@gmail.com</strong>
          </p>

          <br />

          <div style={{ textAlign: "center" }}>
            <Button
              icon={<EditOutlined />}
              className="edit-info-btn"
              onClick={() => setVisibleEditModal(true)}
            >
              Cập nhật
            </Button>
          </div>
        </div>

        <div className="col col-2">
          <ScheduleTable />

          <Divider />

          <UpdatePass />
        </div>
      </div>

      <EditInfo visible={visibleEditModal} setVisible={setVisibleEditModal} />
    </div>
  );
};

export default Account;
