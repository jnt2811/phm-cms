import { Button } from "antd";
import { useDispatch } from "react-redux";
import { doLogout } from "../../../../ducks/slices/authSlice";
import "./adminHeader.scss";

const AdminHeader = () => {
  const dispatch = useDispatch();

  const handleLogout = () => {
    dispatch(doLogout());
  };

  return (
    <div className="admin-header">
      <p>Vai trò: Admin</p>

      <Button onClick={handleLogout}>Đăng xuất</Button>
    </div>
  );
};

export default AdminHeader;
