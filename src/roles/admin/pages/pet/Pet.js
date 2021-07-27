import { Button, Col, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { petList } from "../../../../constances/data";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import PetForm from "./PetForm";
import PetTable from "./PetTable";

const Pet = () => {
  const onNewPet = () => {
    setVisibleNewModal(true);
  };
  const onOkNewPet = () => {
    form.submit();
    if (validSuccess) {
      console.log(form.getFieldsValue());
      form.resetFields();
      setVisibleNewModal(false);
      setValidSuccess(false);
    }
  };
  const onCancelNewPet = () => {
    form.resetFields();
    setVisibleNewModal(false);
  };

  const [form] = useForm();

  const [pets, setPets] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [validSuccess, setValidSuccess] = useState(false);

  useEffect(() => {
    setPets(petList);
  }, []);

  return (
    <div className="pet">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Danh sách chó mèo</h1>
        </Col>

        <Col>
          <Button onClick={onNewPet}>Tạo mới</Button>
        </Col>
      </Row>

      <div className="table-container">
        <PetTable dataSource={pets} />
      </div>

      <div className="pet-modal">
        <FormModal
          visible={visibleNewModal}
          okText="Tạo mới"
          cancelText="Hủy bỏ"
          onOk={onOkNewPet}
          onCancel={onCancelNewPet}
          width={800}
        >
          <h1>Tạo mới quyên góp</h1>
          <br />
          <PetForm form={form} setValidSuccess={() => setValidSuccess(true)} />
        </FormModal>
      </div>
    </div>
  );
};

export default Pet;
