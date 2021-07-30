import { useEffect } from "react";
import { useState } from "react";
import ExaminationHeader from "../header/ExaminationHeader";
import { appointmentList } from "../../../../../constances/data";
import AppointmentTable from "./AppointmentTable";
import { FormModal } from "../../../../../commons/commonModal/CommonModal";

const Appointment = () => {
  const onCancelAppointment = (appointment) => {
    setVisibleModal(true);
    setSelectedAppointment(appointment);
  };

  const onOkModal = () => {
    console.log(selectedAppointment);
    setVisibleModal(false);
    setSelectedAppointment();
    // TODO
  };

  const [appointments, setAppointments] = useState([]);
  const [visibleModal, setVisibleModal] = useState(false);
  const [selectedAppointment, setSelectedAppointment] = useState();

  useEffect(() => {
    setAppointments(appointmentList);
  }, []);

  return (
    <div className="appointment">
      <ExaminationHeader />

      <div className="table-container">
        <AppointmentTable
          dataSource={appointments}
          onCancelAppointment={onCancelAppointment}
        />
      </div>

      <FormModal
        visible={visibleModal}
        okText="Chắc chắn"
        cancelText="Quay lại"
        onCancel={() => setVisibleModal(false)}
        onOk={onOkModal}
      >
        <p style={{ textAlign: "center", margin: "10px", fontSize: "18px" }}>
          Bạn chắc chắn hủy lịch hẹn này chứ?
        </p>
      </FormModal>
    </div>
  );
};

export default Appointment;
