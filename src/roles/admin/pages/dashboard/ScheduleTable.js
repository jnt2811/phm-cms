import { Table } from "antd";
import { useEffect } from "react";
import { useState } from "react";
import { httpRequestGet } from "../../../../ducks/requests/httpRequest";
import apis from "../../../../ducks/requests/apis";

const ScheduleTable = () => {
  const [dataSource, setDataSource] = useState([]);

  useEffect(() => {
    httpRequestGet(apis.SCHEDULE).then((res) => {
      const dataResponse = res.data;
      if (dataResponse.status === "OK") {
        setDataSource(
          dataResponse.data.map((item) => ({ ...item, key: item.id }))
        );
      }
    });
  }, []);

  const columns = [
    {
      title: "Ca",
      dataIndex: "shift",
      key: "shift",
    },
    {
      title: "Thứ 2",
      dataIndex: "mon",
      key: "mon",
      render: (mon) =>
        mon.map((volunteer) => (
          <div key={volunteer.id}>
            {volunteer.name}
            <br />
          </div>
        )),
    },
    {
      title: "Thứ 3",
      dataIndex: "tue",
      key: "tue",
      render: (tue) =>
        tue.map((volunteer) => (
          <div key={volunteer.id}>
            {volunteer.name}
            <br />
          </div>
        )),
    },
    {
      title: "Thứ 4",
      dataIndex: "wed",
      key: "wed",
      render: (wed) =>
        wed.map((volunteer) => (
          <div key={volunteer.id}>
            {volunteer.name}
            <br />
          </div>
        )),
    },
    {
      title: "Thứ 5",
      dataIndex: "thu",
      key: "thu",
      render: (thu) =>
        thu.map((volunteer) => (
          <div key={volunteer.id}>
            {volunteer.name}
            <br />
          </div>
        )),
    },
    {
      title: "Thứ 6",
      dataIndex: "fri",
      key: "fri",
      render: (fri) =>
        fri.map((volunteer) => (
          <div key={volunteer.id}>
            {volunteer.name}
            <br />
          </div>
        )),
    },
    {
      title: "Thứ 7",
      dataIndex: "sat",
      key: "sat",
      render: (sat) =>
        sat.map((volunteer) => (
          <div key={volunteer.id}>
            {volunteer.name}
            <br />
          </div>
        )),
    },
  ];

  return (
    <div className="schedule-table">
      <Table columns={columns} dataSource={dataSource} pagination={false} />
    </div>
  );
};

export default ScheduleTable;
