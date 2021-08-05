import { Button, Col, Input, Row, Table } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  doGetAllDonators,
  doSearchDonator,
  resetDonation,
} from "../../../../../ducks/slices/donationSlice";
import { formatPhone } from "../../../../../utils";

const OldDonator = ({ setDonator }) => {
  const donationReducer = useSelector((state) => state.donation);
  const dispatch = useDispatch();

  const [donators, setDonators] = useState([]);
  const [searchVal, setSearchVal] = useState();
  const [isLoading, setIsLoading] = useState(false);
  const [selectedRowKeys, setSelectedRowKeys] = useState([]);
  const [isReseting, setIsReseting] = useState(false);

  useEffect(() => {
    dispatch(doGetAllDonators());
    setIsLoading(true);
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { donatorList = [], isOk } = donationReducer;
    if (isOk === true) {
      setDonators(
        donatorList.map((donator) => ({ ...donator, key: donator.id }))
      );
      setIsLoading(false);
      dispatch(resetDonation());
    } else if (isOk === false) {
      setDonators(donatorList);
      setIsLoading(false);
      dispatch(resetDonation());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationReducer]);

  const onSearchVal = () => {
    const data = { search: searchVal };
    dispatch(doSearchDonator(data));
    setIsLoading(true);
  };

  const rowSelection = {
    selectedRowKeys,
    onChange: (keys, selectedRows) => {
      setSelectedRowKeys(keys);
      setDonator(selectedRows[0]);
    },
  };

  const onResetSelection = () => {
    setIsReseting(true);

    setTimeout(() => {
      setIsReseting(false);
      setSelectedRowKeys([]);
      setDonator();
    }, 1000);
  };

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
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      render: (phone) => formatPhone(phone),
    },
  ];

  return (
    <div className="old-donator">
      <Row justify="space-between">
        <Col>
          <Button
            loading={isReseting}
            disabled={isLoading}
            onClick={onResetSelection}
          >
            Reset
          </Button>
        </Col>

        <Col>
          <Row gutter={{ sm: 10 }}>
            <Col>
              <Input
                placeholder="Nhập số điện thoại..."
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && onSearchVal()}
                disabled={isLoading}
              />
            </Col>

            <Col>
              <Button onClick={onSearchVal} disabled={isLoading}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Col>
      </Row>

      <br />

      <Table
        rowSelection={{
          type: "radio",
          ...rowSelection,
        }}
        dataSource={donators}
        loading={isLoading}
        columns={columns}
        pagination={false}
      />
    </div>
  );
};

export default OldDonator;
