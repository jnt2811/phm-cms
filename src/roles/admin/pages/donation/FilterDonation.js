import { Col, Form, Input, Row } from "antd";
import { useForm } from "antd/lib/form/Form";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { isEmptyData, validateDate } from "../../../../utils";
import moment from "moment";
import { useState } from "react";
import AddressSelector from "./AddressSelector";

const FilterDonation = ({ filter, setFilter, visible, setVisible }) => {
  const [form] = useForm();

  const [oldInputDateFrom, setOldInputDateFrom] = useState();
  const [oldInputDateTo, setOldInputDateTo] = useState();
  const [resetCode, setResetCode] = useState(false);

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

  const validDonationDate = (date, setTimeFrom, setTimeTo) => {
    const { from, to } = date;
    const bonusTimeTo = 86399000;

    if (!isEmptyData(from) && isEmptyData(to)) {
      if (!validateDate(from)) {
        form.setFields([{ name: "from", errors: ["Ngày không hợp lệ"] }]);
        return false;
      } else {
        const fromTime = moment(from, "DD/MM/YYYY")._d.getTime();
        setTimeFrom(fromTime);
        setTimeTo(null);
        return true;
      }
    } else if (isEmptyData(from) && !isEmptyData(to)) {
      if (!validateDate(to)) {
        form.setFields([{ name: "to", errors: ["Ngày không hợp lệ"] }]);
        return false;
      } else {
        const toTime = moment(to, "DD/MM/YYYY")._d.getTime() + bonusTimeTo;
        setTimeFrom(null);
        setTimeTo(toTime);
        return true;
      }
    } else if (!isEmptyData(from) && !isEmptyData(to)) {
      if (!validateDate(from) && validateDate(to)) {
        form.setFields([{ name: "from", errors: ["Ngày không hợp lệ"] }]);
        return false;
      } else if (validateDate(from) && !validateDate(to)) {
        form.setFields([{ name: "to", errors: ["Ngày không hợp lệ"] }]);
        return false;
      } else if (validateDate(from) && validateDate(to)) {
        const fromTime = moment(from, "DD/MM/YYYY")._d.getTime();
        const toTime = moment(to, "DD/MM/YYYY")._d.getTime() + bonusTimeTo;

        if (fromTime > toTime) {
          form.setFields([{ name: "from", errors: ["Lọc bị lỗi"] }]);
          return false;
        } else {
          setTimeFrom(fromTime);
          setTimeTo(toTime);
          return true;
        }
      } else {
        form.setFields([{ name: "from", errors: ["Ngày không hợp lệ"] }]);
        form.setFields([{ name: "to", errors: ["Ngày không hợp lệ"] }]);
        return false;
      }
    } else {
      setTimeFrom(null);
      setTimeTo(null);
      return true;
    }
  };

  const onFinish = (values) => {
    const { province, district, ward, from, to } = values;

    const data = {
      province: !isEmptyData(province) ? JSON.parse(province) : null,
      district: !isEmptyData(district) ? JSON.parse(district) : null,
      ward: !isEmptyData(ward) ? JSON.parse(ward) : null,
    };

    if (
      validDonationDate(
        { from: from, to: to },
        (from) => (data.from = from),
        (to) => (data.to = to)
      )
    ) {
      setFilter(data);
      setVisible(false);
    }
  };

  const onClear = () => {
    form.resetFields();
    setResetCode(true);
  };

  return (
    <div className="filter-modal">
      <FormModal
        visible={visible}
        okText="Tìm kiếm"
        cancelText="Đặt lại"
        onOk={() => form.submit()}
        onCancel={onClear}
        width={700}
      >
        <h2>Tìm kiếm nâng cao</h2>

        <br />

        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Chọn địa phương quyên góp */}
          <AddressSelector
            form={form}
            required={false}
            initialValue={{
              province: filter.province,
              district: filter.district,
              ward: filter.ward,
            }}
            resetCode={resetCode}
            setResetCode={setResetCode}
          />

          {/* Chọn khoảng ngày quyên góp */}
          <Row gutter={{ sm: 10 }}>
            <Col span={12}>
              {/* Từ ngày... */}
              <Form.Item
                label="Ngày quyên góp"
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
                  onChange={(e) => handleInputDateFrom(e)}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              {/* Đến ngày... */}
              <Form.Item
                label=" "
                name="to"
                rules={[
                  {
                    pattern: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
                    message: "Sai DD/MM/YYYY",
                  },
                ]}
                style={{ paddingTop: "3px" }}
              >
                <Input
                  placeholder="Đến ngày"
                  onChange={(e) => handleInputDateTo(e)}
                />
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </FormModal>
    </div>
  );
};

export default FilterDonation;
