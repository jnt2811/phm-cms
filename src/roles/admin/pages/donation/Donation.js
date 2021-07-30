import { Button, Col, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationTable from "./DonationTable";
import NewDonation from "./NewDonation";
import {
  doGetAllDonations,
  resetDonation,
} from "../../../../ducks/slices/donationSlice";

const Donation = () => {
  const donationReducer = useSelector((state) => state.donation);
  const dispatch = useDispatch();

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleNewModal, setVisibleNewModal] = useState(false);

  useEffect(() => {
    dispatch(doGetAllDonations());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (donationReducer.isOk === true) {
      const { donationList } = donationReducer;
      setDonations(
        donationList.map((donation) => ({ ...donation, key: donation.id }))
      );
      setIsLoading(false);
      dispatch(resetDonation());
    } else if (donationReducer.isOk === false) {
      setIsLoading(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationReducer]);

  const onNewDonation = () => {
    setVisibleNewModal(true);
  };

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
        <DonationTable dataSource={donations} loading={isLoading} />
      </div>

      <NewDonation visible={visibleNewModal} setVisible={setVisibleNewModal} />
    </div>
  );
};

export default Donation;
