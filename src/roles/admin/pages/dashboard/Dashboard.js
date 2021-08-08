import { Col, Divider, Row } from "antd";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import "./dashboard.scss";
import ScheduleTable from "./ScheduleTable";
import { doGetAllPets } from "../../../../ducks/slices/petSlice";
import { doGetAllDonations } from "../../../../ducks/slices/donationSlice";
import { doGetAllVolunteers } from "../../../../ducks/slices/volunteerSlice";
import { formatPrice } from "../../../../utils";

const Dashboard = () => {
  const { petList = [] } = useSelector((state) => state.pet);
  const { donationList = [] } = useSelector((state) => state.donation);
  const { volunteerList = [] } = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  useEffect(() => {
    dispatch(doGetAllPets());
    dispatch(doGetAllDonations());
    dispatch(doGetAllVolunteers());
  }, [dispatch]);

  const getDonationAmountSum = () => {
    let sum = 0;

    donationList.forEach((donation) => (sum += donation.amount));

    return sum;
  };

  return (
    <div className="dashboard">
      <h1>Bảng điều khiển</h1>

      <Divider />

      <h2>Thống kê</h2>

      <br />

      <Row gutter={{ sm: 50 }}>
        <Col span={8}>
          <div className="board">
            <h2>Vật nuôi</h2>

            <div className="number">
              {petList.length} <span className="unit">con</span>
            </div>

            {/* <br />

            <p>
              Chó: {petList.filter((pet) => pet.type === "Chó").length} con /
              Mèo: {petList.filter((pet) => pet.type === "Mèo").length} con
            </p> */}
          </div>
        </Col>

        <Col span={8}>
          <div className="board">
            <h2>Quyên góp</h2>

            <div className="number">
              {/* 3 <span className="unit">triệu VND</span> */}
              {formatPrice(getDonationAmountSum(), "")}{" "}
              <span className="unit">VND</span>
            </div>

            {/* <br />

            <p>
              Top 1: Nguyen Van A <br /> (1 triệu VND)
            </p> */}
          </div>
        </Col>

        <Col span={8}>
          <div className="board">
            <h2>Tình nguyện viên</h2>

            <div className="number">
              {volunteerList.length} <span className="unit">người</span>
            </div>

            {/* <br />

            <p>
              Top 1: Nguyen Van B <br /> (10 con)
            </p> */}
          </div>
        </Col>
      </Row>

      <br />

      <Divider />

      <h2>Lịch làm việc</h2>

      <br />

      <ScheduleTable />

      <br />
    </div>
  );
};

export default Dashboard;
