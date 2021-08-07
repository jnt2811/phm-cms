import { Table } from "antd";

const ScheduleTable = ({ schedule = [] }) => {
  const columns = [
    { title: "", dataIndex: "col", key: "col" },
    { title: "Thứ 2", dataIndex: "mon", key: "mon" },
    { title: "Thứ 3", dataIndex: "tue", key: "tue" },
    { title: "Thứ 4", dataIndex: "wed", key: "wed" },
    { title: "Thứ 5", dataIndex: "thu", key: "thu" },
    { title: "Thứ 6", dataIndex: "fri", key: "fri" },
    { title: "Thứ 7", dataIndex: "sat", key: "sat" },
  ];

  const getDataSource = () => {
    let scheduleShift = {
      key: 1,
      col: "Ca làm",
    };
    schedule.forEach((item) => {
      if (item.date === "2") scheduleShift.mon = item.shift;
      else if (item.date === "3") scheduleShift.tue = item.shift;
      else if (item.date === "4") scheduleShift.wed = item.shift;
      else if (item.date === "5") scheduleShift.thu = item.shift;
      else if (item.date === "6") scheduleShift.fri = item.shift;
      else if (item.date === "7") scheduleShift.sat = item.shift;
    });

    return [scheduleShift];
  };

  return (
    <div className="schedule-table">
      <h1>Lịch làm việc</h1>

      <br />

      <Table
        columns={columns}
        dataSource={getDataSource()}
        pagination={false}
      />
    </div>
  );
};

export default ScheduleTable;
