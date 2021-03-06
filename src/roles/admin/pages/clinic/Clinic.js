import { Button, Col, Input, Row, Select } from "antd";
import { useEffect, useState } from "react";
import ClinicTable from "./ClinicTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllClinics,
  doSearchClinic,
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
    const { isOk, clinicList = [] } = clinicReducer;

    if (isOk === true) {
      setClinics(
        clinicList
          .slice(0)
          .reverse()
          .map((clinic) => ({ ...clinic, key: clinic.id }))
      );
      setIsLoading(false);
      dispatch(resetClinic());
    } else if (clinicReducer.isOk === false) {
      setClinics(clinicList);
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

  const onSearchClinic = () => {
    const data = { search: searchVal };
    dispatch(doSearchClinic(data));
    setIsLoading(true);
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
          <h1>Danh s??ch ph??ng kh??m</h1>
        </Col>

        <Col>
          <Button onClick={onNewClinic}>T???o m???i</Button>
        </Col>
      </Row>

      <br />
      <br />

      <Row justify="space-between">
        <Col>
          <Row gutter={{ sm: 10 }}>
            <Col>
              <Input
                placeholder="Nh???p s??? ??i???n tho???i..."
                style={{ width: "350px" }}
                disabled={isLoading}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && onSearchClinic()}
              />
            </Col>

            <Col>
              <Button disabled={isLoading} onClick={onSearchClinic}>
                T??m ki???m
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
            <Select.Option value={null}>T???t c???</Select.Option>
            <Select.Option value={true}>??ang h???p t??c</Select.Option>
            <Select.Option value={false}>D???ng h???p t??c</Select.Option>
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
