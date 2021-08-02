import { Col, Divider, Row } from "antd";
import "./dashboard.scss";

const Dashboard = () => {
  return (
    <div className="dashboard">
      <h1>Bảng điều khiển</h1>

      <Divider />

      <h2>Thống kê</h2>

      <br />

      <Row gutter={{ sm: 50 }}>
        <Col span={8}>
          <div className="board">
            <h2>Chó mèo</h2>

            <div className="number">
              100 <span className="unit">con</span>
            </div>

            <br />

            <p>Chó: 50 con / Mèo: 50 con</p>
          </div>
        </Col>

        <Col span={8}>
          <div className="board">
            <h2>Quyên góp</h2>

            <div className="number">
              3 <span className="unit">triệu VND</span>
            </div>

            <br />

            <p>
              Top 1: Nguyen Van A <br /> (1 triệu VND)
            </p>
          </div>
        </Col>

        <Col span={8}>
          <div className="board">
            <h2>Tình nguyện viên</h2>

            <div className="number">
              20 <span className="unit">người</span>
            </div>

            <br />

            <p>
              Top 1: Nguyen Van B <br /> (10 con)
            </p>
          </div>
        </Col>
      </Row>

      <br />

      <Divider />

      <h2>Lịch làm việc</h2>
    </div>
  );
};

export default Dashboard;
