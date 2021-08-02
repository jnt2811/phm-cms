import { Link, withRouter } from "react-router-dom";
import "./volunteerHeader.scss";
import pathNames from "../../../router/pathNames";
import { useDispatch } from "react-redux";
import { doLogout } from "../../../ducks/slices/authSlice";

const VolunteerHeader = ({ location }) => {
  const { pathname } = location;
  const dispatch = useDispatch();

  const isAtHome = pathname === pathNames.VOLUNTEER;
  const isAtPet =
    pathname === pathNames.VOLUNTEER_PET ||
    pathname.slice(0, pathNames.VOLUNTEER_PET_nId) ===
      pathNames.VOLUNTEER_PET_nId;
  const isAtAppointment = pathname === pathNames.VOLUNTEER_APPOINTMENT;
  const isAtChat = pathname === pathNames.VOLUNTEER_CHAT;

  const onLogout = () => {
    dispatch(doLogout());
  };

  return (
    <div className="volunteer-header">
      <h1>Volunteer</h1>

      <div className="nav-bar">
        <Link to={pathNames.VOLUNTEER}>
          <div className={"nav-item " + (isAtHome && "active")}>Trang chủ</div>
        </Link>

        <Link to={pathNames.VOLUNTEER_PET}>
          <div className={"nav-item " + (isAtPet && "active")}>Chó mèo</div>
        </Link>

        <Link to={pathNames.VOLUNTEER_APPOINTMENT}>
          <div className={"nav-item " + (isAtAppointment && "active")}>
            Lịch hẹn
          </div>
        </Link>

        <Link to={pathNames.VOLUNTEER_CHAT}>
          <div className={"nav-item " + (isAtChat && "active")}>Nhắn tin</div>
        </Link>
      </div>

      <div className="logout" onClick={onLogout}>
        Đăng xuất
      </div>
    </div>
  );
};

export default withRouter(VolunteerHeader);
