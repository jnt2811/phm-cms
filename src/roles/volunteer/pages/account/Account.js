import { Avatar, Button, Divider } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import "./account.scss";
import { useState } from "react";
import EditInfo from "./EditInfo";
import ScheduleTable from "./ScheduleTable";
import UpdatePass from "./UpdatePass";
import { formatPhone } from "../../../../utils";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { doGetUserInfo, resetAuth } from "../../../../ducks/slices/authSlice";

const Account = () => {
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [userInfo, setUserInfo] = useState({});

  const dispatch = useDispatch();
  const authReducer = useSelector((state) => state.auth);

  useEffect(() => {
    dispatch(doGetUserInfo());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isOk, userData } = authReducer;

    if (isOk === true) {
      setUserInfo(userData);
      dispatch(resetAuth());
    } else if (isOk === false) {
      setUserInfo({});
      dispatch(resetAuth());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [authReducer]);

  return (
    <div className="account">
      <h1>Xin chào, {userInfo.name}</h1>

      <br />
      <br />

      <div className="row">
        <div className="col col-1">
          <div style={{ textAlign: "center" }}>
            <Avatar size={120} icon={<UserOutlined />} src={userInfo.avatar} />

            <br />
            <br />

            <h2>{userInfo.name}</h2>
            <h4>- {userInfo.role} -</h4>
          </div>

          <br />

          <p>
            Ngày sinh: <strong>{userInfo.dob}</strong>
          </p>

          <p>
            Giới tính: <strong>{userInfo.gender}</strong>
          </p>

          <p>
            Địa chỉ: <strong>{userInfo.address}</strong>
          </p>

          <p>
            Số điện thoại: <strong>{formatPhone(userInfo.phone)}</strong>
          </p>

          <p>
            Email: <strong>{userInfo.email}</strong>
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
          <ScheduleTable schedule={userInfo.schedules} />

          <Divider />

          <UpdatePass />
        </div>
      </div>

      <EditInfo
        info={userInfo}
        visible={visibleEditModal}
        setVisible={setVisibleEditModal}
      />
    </div>
  );
};

export default Account;
