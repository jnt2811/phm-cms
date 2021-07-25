import { Button, Col, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { donationList } from "../../../../constances/data";
import DonationForm from "./DonationForm";
import DonationTable from "./DonationTable";
import { FormModal } from "../../../../commons/commonModal/CommonModal";

const Donation = () => {
  const onNewDonation = () => {
    setVisibleNewModal(true);
  };
  const onOkNewDonation = () => {
    form.submit();
    if (validSuccess) {
      console.log(form.getFieldsValue());
      form.resetFields();
      setVisibleNewModal(false);
      setValidSuccess(false);
    }
  };
  const onCancelNewDonation = () => {
    form.resetFields();
    setVisibleNewModal(false);
  };

  const [form] = useForm();

  const [donations, setDonations] = useState([]);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [validSuccess, setValidSuccess] = useState(false);

  useEffect(() => {
    setDonations(donationList);
  }, []);

  return (
    <div className="donation">
      <Row align="middle" gutter={{ lg: 20 }}>
        <Col>
          <h1>Danh sách quyên góp</h1>
        </Col>

        <Col>
          <Button onClick={onNewDonation}>Tạo mới</Button>
        </Col>
      </Row>

      <div className="table-container">
        <DonationTable dataSource={donations} />
      </div>

      <div className="donation-modal">
        <FormModal
          visible={visibleNewModal}
          okText="Tạo mới"
          cancelText="Hủy bỏ"
          onOk={onOkNewDonation}
          onCancel={onCancelNewDonation}
          width={800}
        >
          <h1>Tạo mới quyên góp</h1>
          <br />
          <DonationForm
            form={form}
            setValidSuccess={() => setValidSuccess(true)}
          />
        </FormModal>
      </div>
    </div>
  );
};

export default Donation;
