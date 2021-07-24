import "./adminSider.scss";
import PugImg from "../../../../assets/pug.png";

const AdminSider = () => {
  return (
    <div className="admin-sider">
      <div className="logo">
        <img src={PugImg} alt="" />
      </div>
    </div>
  );
};

export default AdminSider;
