import { EditOutlined, SyncOutlined, UnlockOutlined } from "@ant-design/icons";
import { Button, Col, Row, Table } from "antd";
import { GreenTag, RedTag } from "../../../../commons/commonTag/CommonTag";
import { sexKeys } from "../../../../constances/data";

const VolunteerTable = ({
  dataSource,
  onEditVolunteer,
  onSwitchCollab,
  onUpdatePassword,
}) => {
  // const rowSelection = {
  //   onChange: (selectedRowKeys, selectedRows) => {
  //     console.log(
  //       `selectedRowKeys: ${selectedRowKeys}`,
  //       "selectedRows: ",
  //       selectedRows
  //     );
  //   },
  //   getCheckboxProps: (record) => ({
  //     disabled: record.name === "Disabled User",
  //     name: record.name,
  //   }),
  // };

  const columns = [
    {
      title: "ID",
      dataIndex: "id",
      key: "id",
    },
    {
      title: "Họ và tên",
      dataIndex: "name",
      key: "name",
    },
    {
      title: "Ngày sinh",
      dataIndex: "dob",
      key: "dob",
    },
    {
      title: "Giới tính",
      dataIndex: "sex",
      key: "sex",
      render: (sex) =>
        sex === sexKeys.MALE ? "Nam" : sexKeys.FEMALE ? "Nữ" : "Khác",
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
    },
    {
      title: "Trạng thái",
      dataIndex: "collab",
      key: "collab",
      render: (collab) =>
        collab ? <GreenTag>Đang làm</GreenTag> : <RedTag>Nghỉ làm</RedTag>,
    },
    {
      title: "",
      dataIndex: "collab",
      key: "collab",
      render: (collab, record) => (
        <Row gutter={{ lg: 10 }}>
          <Col>
            <Button
              className="edit-btn"
              icon={<EditOutlined />}
              disabled={!collab}
              onClick={() => onEditVolunteer(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="collab-btn"
              icon={<SyncOutlined />}
              onClick={() => onSwitchCollab(record)}
            ></Button>
          </Col>

          <Col>
            <Button
              className="password-btn"
              icon={<UnlockOutlined />}
              disabled={!collab}
              onClick={() => onUpdatePassword(record)}
            ></Button>
          </Col>
        </Row>
      ),
    },
  ];

  return (
    <Table
      columns={columns}
      dataSource={dataSource}
      pagination={false}
      // rowSelection={{ type: "checkbox", ...rowSelection }}
    />
  );
};

export default VolunteerTable;
