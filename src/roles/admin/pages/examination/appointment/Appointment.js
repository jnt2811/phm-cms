import { useEffect } from "react";
import { useState } from "react";
import ExaminationHeader from "../header/ExaminationHeader";
import AppointmentTable from "./AppointmentTable";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllAppointments,
  resetAppointment,
} from "../../../../../ducks/slices/appointmentSlice";
import DeleteAppointment from "./DeleteAppointment";

const Appointment = () => {
  const appointmentReducer = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  const onDeleteAppointment = (appointment) => {
    setVisibleModal(true);
    setSelectedAppointment(appointment);
  };

  const [appointments, setAppointments] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
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
        appointmentList
          // .slice(0)
          // .reverse()
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

  return (
    <div className="appointment">
      <ExaminationHeader />

      <div className="table-container">
        <AppointmentTable
          dataSource={appointments}
          onDeleteAppointment={onDeleteAppointment}
          loading={isLoading}
        />
      </div>

      <DeleteAppointment
        appointment={selectedAppointment}
        visible={visibleModal}
        setVisible={setVisibleModal}
      />
    </div>
  );
};

export default Appointment;
