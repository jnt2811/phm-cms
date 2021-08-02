import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import VolunteerTable from "./VolunteerTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllVolunteers,
  resetVolunteer,
} from "../../../../ducks/slices/volunteerSlice";
import NewVolunteer from "./NewVolunteer";
import EditVolunteer from "./EditVolunteer";
import SwitchCollab from "./SwitchCollab";
import ViewVolunteer from "./ViewVolunteer";
import UpdateAuth from "./UpdateAuth";
import UpdateSchedule from "./UpdateSchedule";

const Volunteer = () => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [volunteers, setVolunteers] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visibleAuthModal, setVisibleAuthModal] = useState(false);
  const [visibleSwitchModal, setVisibleSwitchModal] = useState(false);
  const [visibleViewModal, setVisibleViewModal] = useState(false);
  const [visibleScheduleModal, setVisibleScheduleModal] = useState(false);
  const [selectedVolunteer, setSelectedVolunteer] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState(null);

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

  const onViewVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleViewModal(true);
  };

  const onEditVolunteer = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleEditModal(true);
  };

  const onUpdateAuth = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleAuthModal(true);
  };

  const onSwitchCollab = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleSwitchModal(true);
  };

  const onUpdateSchedule = (volunteer) => {
    setSelectedVolunteer(volunteer);
    setVisibleScheduleModal(true);
  };

  const onSearchVolunteer = () => {
    console.log(searchVal);
  };

  const handleDataSource = (volunteers) => {
    if (filterVal === true || filterVal === false) {
      return volunteers.filter((volunteer) => {
        if (volunteer.collab === filterVal) return true;
        else return false;
      });
    } else return volunteers;
  };

  return (
    <div className="volunteer">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Danh sách tình nguyện viên</h1>
        </Col>

        <Col>
          <Button onClick={onNewVolunteer}>Tạo mới</Button>
        </Col>
      </Row>

      <br />
      <br />

      <Row justify="space-between">
        <Col>
          <Row gutter={{ sm: 10 }}>
            <Col>
              <Input
                placeholder="Nhập số điện thoại..."
                style={{ width: "350px" }}
                disabled={isLoading}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && onSearchVolunteer()}
              />
            </Col>

            <Col>
              <Button disabled={isLoading} onClick={onSearchVolunteer}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Col>

        <Col>
          <Select
            className="select"
            style={{ width: "200px" }}
            defaultValue={filterVal}
            disabled={isLoading}
            onChange={(val) => setFilterVal(val)}
          >
            <Select.Option value={null}>Tất cả</Select.Option>
            <Select.Option value={true}>Đang làm</Select.Option>
            <Select.Option value={false}>Đã làm</Select.Option>
          </Select>
        </Col>
      </Row>

      <br />

      <div className="table-container">
        <VolunteerTable
          dataSource={handleDataSource(volunteers)}
          onViewVolunteer={onViewVolunteer}
          onEditVolunteer={onEditVolunteer}
          onUpdateAuth={onUpdateAuth}
          onSwitchCollab={onSwitchCollab}
          onUpdateSchedule={onUpdateSchedule}
          loading={isLoading}
        />
      </div>

      <NewVolunteer visible={visibleNewModal} setVisible={setVisibleNewModal} />

      <ViewVolunteer
        visible={visibleViewModal}
        onClose={() => setVisibleViewModal(false)}
        volunteer={selectedVolunteer}
      />

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

      <UpdateAuth
        volunteer={selectedVolunteer}
        visible={visibleAuthModal}
        setVisible={setVisibleAuthModal}
      />

      <UpdateSchedule
        setVisible={setVisibleScheduleModal}
        visible={visibleScheduleModal}
        volunteer={selectedVolunteer}
      />
    </div>
  );
};

export default Volunteer;
