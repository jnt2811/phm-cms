import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doSwitchCollabVolunteer } from "../../../../ducks/slices/volunteerSlice";

const SwitchCollab = ({ volunteer, visible, setVisible }) => {
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  useEffect(() => {
    const { isOk, message } = volunteerReducer;

    const successMessage = successMessages.SWITCH_COLLAB_VOLUNTEER;
    const failMessage = failMessages.SWITCH_COLLAB_VOLUNTEER;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerReducer]);

  const onOk = () => {
    const requestData = {
      id: volunteer.id,
      collab: !volunteer.collab,
    };
    dispatch(doSwitchCollabVolunteer(requestData));
    notification.open({ message: "Đang xử lý..." });
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div className="switch-collab-volunteer">
      <FormModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <h1>Xác nhận thay đổi trạng thái</h1>
        <h3>Tình nguyện viên: {volunteer && volunteer.name}</h3>

        <br />

        <p>Bạn chắc chắn muốn thay đổi trạng của tình nguyện viên này chứ?</p>
      </FormModal>
    </div>
  );
};

export default SwitchCollab;
