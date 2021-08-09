import { Col, Form, Input, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import {
  doGetAllVolunteers,
  resetVolunteer,
} from "../../../../ducks/slices/volunteerSlice";
import moment from "moment";
import { isEmptyData, validateDate } from "../../../../utils";

const FilterPet = ({ filter, setFilter, visible, setVisible }) => {
  const [form] = useForm();

  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  const [volunteers, setVolunteers] = useState([]);
  const [oldInputDateFrom, setOldInputDateFrom] = useState();
  const [oldInputDateTo, setOldInputDateTo] = useState();

  useEffect(() => {
    dispatch(doGetAllVolunteers());

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (volunteerReducer.isOk === true) {
      const { volunteerList = [] } = volunteerReducer;

      setVolunteers(
        volunteerList
          .slice(0)
          .reverse()
          .map((volunteer) => ({ ...volunteer, key: volunteer.id }))
      );

      dispatch(resetVolunteer());
    } else if (volunteerReducer.isOk === false) {
      if (volunteerReducer.volunteerList !== undefined)
        setVolunteers(
          volunteerReducer.volunteerList
            .slice(0)
            .reverse()
            .map((volunteer) => ({
              ...volunteer,
              key: volunteer.id,
            }))
        );

      dispatch(resetVolunteer());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerReducer]);

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

  const validRescueDate = (date, setTimeFrom, setTimeTo) => {
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
    let data = { ...values, rescuer: JSON.parse(values.rescuer) };

    if (
      validRescueDate(
        { from: values.from, to: values.to },
        (from) => (data.from = from),
        (to) => (data.to = to)
      )
    ) {
      setFilter(data);
      setVisible(false);
    }
  };

  return (
    <div className="filter-pet">
      <FormModal
        visible={visible}
        okText="Tìm kiếm"
        cancelText="Đặt lại"
        onOk={() => form.submit()}
        onCancel={() => form.resetFields()}
      >
        <h2>Tìm kiếm nâng cao</h2>

        <br />

        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Chọn loài */}
          <Form.Item label="Loài" name="type" initialValue={null}>
            <Select className="select" style={{ width: "100%" }} showSearch>
              <Select.Option value={null}>Tất cả</Select.Option>
              <Select.Option value="Chó">Chó</Select.Option>
              <Select.Option value="Mèo">Mèo</Select.Option>
            </Select>
          </Form.Item>

          {/* Chọn giới tính */}
          <Form.Item label="Giới tính" name="gender" initialValue={null}>
            <Select className="select" style={{ width: "100%" }} showSearch>
              <Select.Option value={null}>Tất cả</Select.Option>
              <Select.Option value="Đực">Đực</Select.Option>
              <Select.Option value="Cái">Cái</Select.Option>
            </Select>
          </Form.Item>

          {/* Chọn người cứu trợ */}
          <Form.Item label="Người cứu trợ" name="rescuer" initialValue={null}>
            <Select className="select" style={{ width: "100%" }} showSearch>
              <Select.Option value={null}>Tất cả</Select.Option>
              <Select.Option value={JSON.stringify({ name: "admin" })}>
                Admin
              </Select.Option>
              {volunteers.map((volunteer) => (
                <Select.Option
                  key={volunteer.id}
                  value={JSON.stringify(volunteer)}
                >
                  {volunteer.name}
                </Select.Option>
              ))}
            </Select>
          </Form.Item>

          {/* Chọn khoảng ngày cứu trợ */}
          <Row gutter={{ sm: 10 }}>
            <Col span={12}>
              {/* Từ ngày... */}
              <Form.Item
                label="Ngày cứu trợ"
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

export default FilterPet;
