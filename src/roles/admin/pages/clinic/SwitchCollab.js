import { notification } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doSwitchCollabClinic } from "../../../../ducks/slices/clinicSlice";

const SwitchCollab = ({ clinic, visible, setVisible }) => {
  const clinicReducer = useSelector((state) => state.clinic);
  const dispatch = useDispatch();

  useEffect(() => {
    const { isOk, message } = clinicReducer;

    const successMessage = successMessages.SWITCH_COLLAB_CLINIC;
    const failMessage = failMessages.SWITCH_COLLAB_CLINIC;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicReducer]);

  const onOk = () => {
    const requestData = {
      id: clinic.id,
      collab: !clinic.collab,
    };
    dispatch(doSwitchCollabClinic(requestData));
    notification.open({ message: "Đang xử lý..." });
  };

  const onCancel = () => {
    setVisible(false);
  };

  return (
    <div className="switch-collab-clinic">
      <FormModal
        visible={visible}
        onOk={onOk}
        onCancel={onCancel}
        okText="Xác nhận"
        cancelText="Hủy bỏ"
      >
        <h1>Xác nhận thay đổi trạng thái</h1>
        <h3>Phòng khám: {clinic && clinic.name}</h3>

        <br />

        <p>Bạn chắc chắn muốn thay đổi trạng của phòng khám này chứ?</p>
      </FormModal>
    </div>
  );
};

export default SwitchCollab;
