import { useEffect } from "react";
import { useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllAppointmentsByClinic,
  resetAppointment,
} from "../../../../../ducks/slices/appointmentSlice";
import DeleteAppointment from "./DeleteAppointment";
import NewReport from "./NewReport";

const Appointment = () => {
  const appointmentReducer = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  const [appointments, setAppointments] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [visibleDeleteModal, setVisibleDeleteModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();
  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    dispatch(doGetAllAppointmentsByClinic());
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

  const onNewReport = (appointment) => {
    setVisibleNewModal(true);
    setSelectedAppointment(appointment);
  };

  const onDeleteAppointment = (appointment) => {
    setVisibleDeleteModal(true);
    setSelectedAppointment(appointment);
  };

  return (
    <div className="appointment">
      <h1>Lịch hẹn đặt khám</h1>

      <br />
      <br />

      <div className="table-container">
        <AppointmentTable
          dataSource={appointments}
          onNewReport={onNewReport}
          onDeleteAppointment={onDeleteAppointment}
          loading={isLoading}
        />
      </div>

      <NewReport
        appointment={selectedAppointment}
        visible={visibleNewModal}
        setVisible={setVisibleNewModal}
      />

      <DeleteAppointment
        appointment={selectedAppointment}
        visible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
      />
    </div>
  );
};

export default Appointment;
