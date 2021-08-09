import { useEffect } from "react";
import { useState } from "react";
import AppointmentTable from "./AppointmentTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllAppointmentsByClinic,
  resetAppointment,
} from "../../../../../ducks/slices/appointmentSlice";
import DeleteAppointment from "./DeleteAppointment";
import { useHistory } from "react-router-dom";
import pathNames from "../../../../../router/pathNames";

const Appointment = () => {
  const appointmentReducer = useSelector((state) => state.appointment);
  const dispatch = useDispatch();
  const history = useHistory();

  const [appointments, setAppointments] = useState([]);
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
        appointmentList
          .slice(0)
          .reverse()
          .map((appointment) => ({
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
    history.push(pathNames.CLINIC_NEW_REPORT_nId + appointment.id);
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

      <DeleteAppointment
        appointment={selectedAppointment}
        visible={visibleDeleteModal}
        setVisible={setVisibleDeleteModal}
      />
    </div>
  );
};

export default Appointment;
