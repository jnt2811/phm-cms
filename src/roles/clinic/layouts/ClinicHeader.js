import { Link, withRouter } from "react-router-dom";
import "./clinicHeader.scss";
import pathNames from "../../../router/pathNames";
import { useDispatch } from "react-redux";
import { doLogout } from "../../../ducks/slices/authSlice";

const ClinicHeader = ({ location }) => {
  const { pathname } = location;
  const dispatch = useDispatch();

  const isAtHome = pathname === pathNames.CLINIC;
  const isAtAppointment = pathname === pathNames.CLINIC_APPOINTMENT;
  const isAtReport =
    pathname === pathNames.CLINIC_REPORT ||
    pathname === pathNames.CLINIC_NEW_REPORT;
  const isAtChat = pathname === pathNames.CLINIC_CHAT;

  const onLogout = () => {
    dispatch(doLogout());
  };

  return (
    <div className="clinic-header">
      <h1>Clinic</h1>

      <div className="nav-bar">
        <Link to={pathNames.CLINIC}>
          <div className={"nav-item " + (isAtHome && "active")}>Trang chủ</div>
        </Link>

        <Link to={pathNames.CLINIC_APPOINTMENT}>
          <div className={"nav-item " + (isAtAppointment && "active")}>
            Lịch hẹn
          </div>
        </Link>

        <Link to={pathNames.CLINIC_REPORT}>
          <div className={"nav-item " + (isAtReport && "active")}>Lịch sử</div>
        </Link>

        <Link to={pathNames.CLINIC_CHAT}>
          <div className={"nav-item " + (isAtChat && "active")}>Nhắn tin</div>
        </Link>
      </div>

      <div className="logout" onClick={onLogout}>
        Đăng xuất
      </div>
    </div>
  );
};

export default withRouter(ClinicHeader);
