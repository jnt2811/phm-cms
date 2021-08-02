import { useEffect } from "react";
import { useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllAppointments,
  resetAppointment,
} from "../../../../ducks/slices/appointmentSlice";
import DeleteAppointment from "./DeleteAppointment";
import NewAppointment from "./NewAppointment";
import { Button, Col, Row } from "antd";

const Appointment = () => {
  const appointmentReducer = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  const onDeleteAppointment = (appointment) => {
    setVisibleDeleteModal(true);
    setSelectedAppointment(appointment);
  };

  const [appointments, setAppointments] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(doGetAllAppointments());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isOk } = appointmentReducer;

    if (isOk === true) {
      const { appointmentList } = appointmentReducer;
      setAppointments(
        appointmentList.map((appointment) => ({
          ...appointment,
          key: appointment.id,
        }))
      );
      setIsLoading(false);
      dispatch(resetAppointment());
    } else if (isOk === false) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentReducer]);

  return (
    <div className="appointment">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Lịch hẹn</h1>
        </Col>

        <Col>
          <Button onClick={() => setVisibleNewModal(true)}>Tạo mới</Button>
        </Col>
      </Row>

      <br />
      <br />

      <div className="table-container">
        <AppointmentTable
          dataSource={appointments}
          onDeleteAppointment={onDeleteAppointment}
          loading={isLoading}
        />
      </div>

      <DeleteAppointment
        appointment={selectedAppointment}
        visible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
      />

      <NewAppointment
        visible={visibleNewModal}
        setVisible={setVisibleNewModal}
      />
    </div>
  );
};

export default Appointment;
