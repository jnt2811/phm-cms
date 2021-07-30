import { Button, Modal } from "antd";
import "./commonModal.scss";

export const FormModal = ({
  children,
  visible,
  okText,
  cancelText,
  onOk,
  onCancel,
  width,
  ...props
}) => {
  return (
    <Modal
      className="form-modal"
      {...props}
      width={width}
      visible={visible}
      maskClosable={false}
      closable={false}
      footer={[
        <Button key="1" className="cancel-btn" onClick={onCancel}>
          {cancelText}
        </Button>,
        <Button key="2" className="ok-btn" onClick={onOk}>
          {okText}
        </Button>,
      ]}
      getContainer={false}
    >
      {children}
    </Modal>
  );
};

export const InfoModal = ({ children, visible, onClose, width, ...props }) => {
  return (
    <Modal
      className="info-modal"
      {...props}
      visible={visible}
      footer={null}
      onCancel={onClose}
      width={width}
    >
      {children}
    </Modal>
  );
};
