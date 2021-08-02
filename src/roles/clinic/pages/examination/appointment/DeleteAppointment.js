import { FormModal } from "../../../../../commons/commonModal/CommonModal";

const DeleteAppointment = ({ appointment, visible, setVisible }) => {
  const onOkModal = () => {
    console.log(appointment);
    setVisible(false);
    // TODO
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
