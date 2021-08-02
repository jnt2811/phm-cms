import { Button } from "antd";
import { useDispatch } from "react-redux";
import { doLogout } from "../../../../ducks/slices/authSlice";
import "./adminHeader.scss";
import localKeys from "../../../../constances/localKeys";

const AdminHeader = () => {
  const role = JSON.parse(localStorage.getItem(localKeys.USER_DATA)).rest.role;
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(doLogout());
  };

  return (
    <div className="admin-header">
      <p>Vai trò: {role}</p>

      <Button onClick={handleLogout}>Đăng xuất</Button>
    </div>
  );
};

export default AdminHeader;
