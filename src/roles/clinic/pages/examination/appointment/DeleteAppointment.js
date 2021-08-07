import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../../commons/commonModal/CommonModal";
import {
  failMessages,
  successMessages,
} from "../../../../../constances/messages";
import { doDeleteAppointment } from "../../../../../ducks/slices/appointmentSlice";

const DeleteAppointment = ({ appointment, visible, setVisible }) => {
  const appointmentReducer = useSelector((state) => state.appointment);
  const dispatch = useDispatch();

  useEffect(() => {
    const { isOk, message = "" } = appointmentReducer;

    const successMessage = successMessages.DELETE_APPOINTMENT;
    const failMessage = failMessages.DELETE_APPOINTMENT;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentReducer]);

  const onOkModal = () => {
    dispatch(doDeleteAppointment(appointment.id));
    notification.open({ message: "Đang xử lý..." });
  };

  return (
    <div className="delete-appointment">
      <FormModal
        visible={visible}
        okText="Chắc chắn"
        cancelText="Quay lại"
        onCancel={() => setVisible(false)}
        onOk={onOkModal}
      >
        <p style={{ textAlign: "center", margin: "10px", fontSize: "18px" }}>
          Bạn chắc chắn hủy lịch hẹn này chứ?
        </p>
      </FormModal>
    </div>
  );
};

export default DeleteAppointment;
