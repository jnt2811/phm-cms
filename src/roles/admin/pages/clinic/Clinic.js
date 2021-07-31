import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import ClinicTable from "./ClinicTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllClinics,
  resetClinic,
} from "../../../../ducks/slices/clinicSlice";
import NewClinic from "./NewClinic";
import EditClinic from "./EditClinic";
import UpdateAuth from "./UpdateAuth";
import SwitchCollab from "./SwitchCollab";
import ViewClinic from "./ViewClinic";

const Clinic = () => {
  const clinicReducer = useSelector((state) => state.clinic);
  const dispatch = useDispatch();

  const [clinics, setClinics] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visiblePassModal, setVisiblePassModal] = useState(false);
  const [visibleSwitchModal, setVisibleSwitchModal] = useState(false);
  const [visibleViewModal, setVisibleViewModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [filterVal, setFilterVal] = useState(null);

  useEffect(() => {
    dispatch(doGetAllClinics());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (clinicReducer.isOk === true) {
      const { clinicList } = clinicReducer;
      setClinics(clinicList.map((clinic) => ({ ...clinic, key: clinic.id })));
      setIsLoading(false);
      dispatch(resetClinic());
    } else if (clinicReducer.isOk === false) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicReducer]);

  const onNewClinic = () => {
    setVisibleNewModal(true);
  };

  const onViewClinic = (clinic) => {
    setSelectedClinic(clinic);
    setVisibleViewModal(true);
  };

  const onEditClinic = (clinic) => {
    setSelectedClinic(clinic);
    setVisibleEditModal(true);
  };

  const onUpdatePassword = (clinic) => {
    setSelectedClinic(clinic);
    setVisiblePassModal(true);
  };

  const onSwitchCollab = (clinic) => {
    setSelectedClinic(clinic);
    setVisibleSwitchModal(true);
  };

  const onSearchVolunteer = () => {
    console.log(searchVal);
  };

  const handleDataSource = (clinics) => {
    if (filterVal === true || filterVal === false) {
      return clinics.filter((clinic) => {
        if (clinic.collab === filterVal) return true;
        else return false;
      });
    } else return clinics;
  };

  return (
    <div className="clinic">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Danh sách phòng khám</h1>
        </Col>

        <Col>
          <Button onClick={onNewClinic}>Tạo mới</Button>
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
            <Select.Option value={true}>Đang hợp tác</Select.Option>
            <Select.Option value={false}>Dừng hợp tác</Select.Option>
          </Select>
        </Col>
      </Row>

      <br />

      <div className="table-container">
        <ClinicTable
          dataSource={handleDataSource(clinics)}
          onViewClinic={onViewClinic}
          onEditClinic={onEditClinic}
          onUpdatePassword={onUpdatePassword}
          onSwitchCollab={onSwitchCollab}
          loading={isLoading}
        />
      </div>

      <NewClinic visible={visibleNewModal} setVisible={setVisibleNewModal} />

      <ViewClinic
        clinic={selectedClinic}
        visible={visibleViewModal}
        onClose={() => setVisibleViewModal(false)}
      />

      <EditClinic
        clinic={selectedClinic}
        visible={visibleEditModal}
        setVisible={setVisibleEditModal}
      />

      <SwitchCollab
        clinic={selectedClinic}
        visible={visibleSwitchModal}
        setVisible={setVisibleSwitchModal}
      />

      <UpdateAuth
        clinic={selectedClinic}
        visible={visiblePassModal}
        setVisible={setVisiblePassModal}
      />
    </div>
  );
};

export default Clinic;
