import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import VolunteerTable from "./VolunteerTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllVolunteers,
  resetVolunteer,
} from "../../../../ducks/slices/volunteerSlice";
import NewVolunteer from "./NewVolunteer";
import EditVolunteer from "./EditVolunteer";
import UpdatePassword from "./UpdatePassword";
import SwitchCollab from "./SwitchCollab";

const Volunteer = () => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [volunteers, setVolunteers] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visiblePassModal, setVisiblePassModal] = useState(false);
  const [visibleSwitchModal, setVisibleSwitchModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(doGetAllVolunteers());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (volunteerReducer.isOk === true) {
      const { volunteerList } = volunteerReducer;
      setVolunteers(
        volunteerList.map((volunteer) => ({ ...volunteer, key: volunteer.id }))
      );
      setIsLoading(false);
      dispatch(resetVolunteer());
    } else if (volunteerReducer.isOk === false) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerReducer]);

  const onNewVolunteer = () => {
    setVisibleNewModal(true);
  };

  const onEditVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleEditModal(true);
  };

  const onUpdatePassword = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisiblePassModal(true);
  };

  const onSwitchCollab = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleSwitchModal(true);
  };

  return (
    <div className="volunteer">
      <Row justify="space-between" align="middle" gutter={{ lg: 20 }}>
        <Col>
          <Row align="middle" gutter={{ lg: 20 }}>
            <Col>
              <h1>Danh sách tình nguyện viên</h1>
            </Col>

            <Col>
              <Button onClick={onNewVolunteer}>Tạo mới</Button>
            </Col>
          </Row>
        </Col>

        <Col>
          <Button>Lịch làm việc</Button>
        </Col>
      </Row>

      <div className="table-container">
        <VolunteerTable
          dataSource={volunteers}
          onEditVolunteer={onEditVolunteer}
          onUpdatePassword={onUpdatePassword}
          onSwitchCollab={onSwitchCollab}
          loading={isLoading}
        />
      </div>

      <NewVolunteer visible={visibleNewModal} setVisible={setVisibleNewModal} />

      <EditVolunteer
        volunteer={selectedVolunteer}
        visible={visibleEditModal}
        setVisible={setVisibleEditModal}
      />

      <SwitchCollab
        volunteer={selectedVolunteer}
        visible={visibleSwitchModal}
        setVisible={setVisibleSwitchModal}
      />

      <UpdatePassword
        volunteer={selectedVolunteer}
        visible={visiblePassModal}
        setVisible={setVisiblePassModal}
      />
    </div>
  );
};

export default Volunteer;
