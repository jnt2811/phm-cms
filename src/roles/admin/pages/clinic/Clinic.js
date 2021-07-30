import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import ClinicTable from "./ClinicTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllClinics,
  resetClinic,
} from "../../../../ducks/slices/clinicSlice";
import NewClinic from "./NewClinic";
import EditClinic from "./EditClinic";
import UpdatePassword from "./UpdatePassword";
import SwitchCollab from "./SwitchCollab";

const Clinic = () => {
  const clinicReducer = useSelector((state) => state.clinic);
  const dispatch = useDispatch();

  const [clinics, setClinics] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleEditModal, setVisibleEditModal] = useState(false);
  const [visiblePassModal, setVisiblePassModal] = useState(false);
  const [visibleSwitchModal, setVisibleSwitchModal] = useState(false);
  const [selectedClinic, setSelectedClinic] = useState();
  const [isLoading, setIsLoading] = useState(false);

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

      <div className="table-container">
        <ClinicTable
          dataSource={clinics}
          onEditClinic={onEditClinic}
          onUpdatePassword={onUpdatePassword}
          onSwitchCollab={onSwitchCollab}
          loading={isLoading}
        />
      </div>

      <NewClinic visible={visibleNewModal} setVisible={setVisibleNewModal} />

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

      <UpdatePassword
        clinic={selectedClinic}
        visible={visiblePassModal}
        setVisible={setVisiblePassModal}
      />
    </div>
  );
};

export default Clinic;
