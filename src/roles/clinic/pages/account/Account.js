import { Avatar, Button } from "antd";
import { EditOutlined, UserOutlined } from "@ant-design/icons";
import "./account.scss";
import { useEffect, useState } from "react";
import EditInfo from "./EditInfo";
import UpdatePass from "./UpdatePass";
import { useDispatch, useSelector } from "react-redux";
import { doGetUserInfo, resetAuth } from "../../../../ducks/slices/authSlice";
import { formatPhone } from "../../../../utils";

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
            Số điện thoại: <strong>{formatPhone(userInfo.phone)}</strong>
          </p>

          <p>
            Email: <strong>{userInfo.email}</strong>
          </p>

          <p>
            Địa chỉ: <strong>{userInfo.address}</strong>
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
