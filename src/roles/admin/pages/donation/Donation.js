import { Button, Col, Form, Input, Row } from "antd";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import DonationTable from "./DonationTable";
import NewDonation from "./NewDonation";
import {
  doGetAllDonations,
  resetDonation,
} from "../../../../ducks/slices/donationSlice";
import { useForm } from "antd/lib/form/Form";
import moment from "moment";
import { isEmptyData, validateDate } from "../../../../utils";

const Donation = () => {
  const donationReducer = useSelector((state) => state.donation);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [donations, setDonations] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [visibleNewModal, setVisibleNewModal] = useState(false);
  const [searchVal, setSearchVal] = useState("");
  const [oldInputDateFrom, setOldInputDateFrom] = useState();
  const [oldInputDateTo, setOldInputDateTo] = useState();
  const [timeFrom, setTimeFrom] = useState(null);
  const [timeTo, setTimeTo] = useState(null);

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

  const onSearchDonation = () => {
    console.log(searchVal);
  };

  const handleInputDateFrom = (e) => {
    const { value } = e.target;
    setOldInputDateFrom(value);
    if (
      (value.length === 2 || value.length === 5) &&
      value.length > oldInputDateFrom.length
    ) {
      form.setFieldsValue({ from: value + "/" });
    }
  };

  const handleInputDateTo = (e) => {
    const { value } = e.target;
    setOldInputDateTo(value);
    if (
      (value.length === 2 || value.length === 5) &&
      value.length > oldInputDateTo.length
    ) {
      form.setFieldsValue({ to: value + "/" });
    }
  };

  const onFilter = (values) => {
    const { from, to } = values;
    const bonusTimeTo = 86399000;

    if (!isEmptyData(from) && isEmptyData(to)) {
      if (!validateDate(from)) {
        form.setFields([{ name: "from", errors: ["Ngày không hợp lệ"] }]);
      } else {
        const fromTime = moment(from, "DD/MM/YYYY")._d.getTime();
        setTimeFrom(fromTime);
        setTimeTo(null);
      }
    } else if (isEmptyData(from) && !isEmptyData(to)) {
      if (!validateDate(to)) {
        form.setFields([{ name: "to", errors: ["Ngày không hợp lệ"] }]);
      } else {
        const toTime = moment(to, "DD/MM/YYYY")._d.getTime() + bonusTimeTo;
        setTimeFrom(null);
        setTimeTo(toTime);
      }
    } else if (!isEmptyData(from) && !isEmptyData(to)) {
      if (!validateDate(from) && validateDate(to)) {
        form.setFields([{ name: "from", errors: ["Ngày không hợp lệ"] }]);
      } else if (validateDate(from) && !validateDate(to)) {
        form.setFields([{ name: "to", errors: ["Ngày không hợp lệ"] }]);
      } else if (validateDate(from) && validateDate(to)) {
        const fromTime = moment(from, "DD/MM/YYYY")._d.getTime();
        const toTime = moment(to, "DD/MM/YYYY")._d.getTime() + bonusTimeTo;

        if (fromTime > toTime) {
          form.setFields([{ name: "from", errors: ["Lọc bị lỗi"] }]);
        } else {
          setTimeFrom(fromTime);
          setTimeTo(toTime);
        }
      } else {
        form.setFields([{ name: "from", errors: ["Ngày không hợp lệ"] }]);
        form.setFields([{ name: "to", errors: ["Ngày không hợp lệ"] }]);
      }
    } else {
      setTimeFrom(null);
      setTimeTo(null);
    }
  };

  const handleDataSource = (donations) => {
    if (!isEmptyData(timeFrom) && isEmptyData(timeTo)) {
      return donations.filter((donation) => {
        const timeCreateAt = moment(donation.createAt)._d.getTime();
        if (timeCreateAt >= timeFrom) return true;
        else return false;
      });
    } else if (isEmptyData(timeFrom) && !isEmptyData(timeTo)) {
      return donations.filter((donation) => {
        const timeCreateAt = moment(donation.createAt)._d.getTime();
        if (timeCreateAt <= timeTo) return true;
        else return false;
      });
    } else if (!isEmptyData(timeFrom) && !isEmptyData(timeTo)) {
      return donations.filter((donation) => {
        const timeCreateAt = moment(donation.createAt)._d.getTime();
        if (timeCreateAt >= timeFrom && timeCreateAt <= timeTo) return true;
        else return false;
      });
    } else return donations;
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

      <br />
      <br />

      <Row justify="space-between">
        <Col>
          <Row gutter={{ sm: 10 }}>
            <Col>
              <Input
                placeholder="Nhập số điện thoại..."
                style={{ width: "300px" }}
                disabled={isLoading}
                onChange={(e) => setSearchVal(e.target.value)}
                onKeyUp={(e) => e.keyCode === 13 && onSearchDonation()}
              />
            </Col>

            <Col>
              <Button disabled={isLoading} onClick={onSearchDonation}>
                Tìm kiếm
              </Button>
            </Col>
          </Row>
        </Col>

        <Col>
          <Form form={form} onFinish={onFilter}>
            <Row gutter={{ sm: 10 }}>
              <Col>
                <Form.Item
                  name="from"
                  rules={[
                    {
                      pattern: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
                      message: "Sai DD/MM/YYYY",
                    },
                  ]}
                >
                  <Input
                    placeholder="Từ ngày"
                    style={{ width: "150px" }}
                    disabled={isLoading}
                    onChange={(e) => handleInputDateFrom(e)}
                  />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item
                  name="to"
                  rules={[
                    {
                      pattern: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
                      message: "Sai DD/MM/YYYY",
                    },
                  ]}
                >
                  <Input
                    placeholder="Đến ngày"
                    style={{ width: "150px" }}
                    disabled={isLoading}
                    onChange={(e) => handleInputDateTo(e)}
                  />
                </Form.Item>
              </Col>

              <Col>
                <Form.Item>
                  <Button htmlType="submit" disabled={isLoading}>
                    Lọc
                  </Button>
                </Form.Item>
              </Col>
            </Row>
          </Form>
        </Col>
      </Row>

      <div className="table-container">
        <DonationTable
          dataSource={handleDataSource(donations)}
          loading={isLoading}
        />
      </div>

      <NewDonation visible={visibleNewModal} setVisible={setVisibleNewModal} />
    </div>
  );
};

export default Donation;
