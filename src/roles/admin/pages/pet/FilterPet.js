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
        form.setFields([{ name: "from", errors: ["Ng??y kh??ng h???p l???"] }]);
        return false;
      } else {
        const fromTime = moment(from, "DD/MM/YYYY")._d.getTime();
        setTimeFrom(fromTime);
        setTimeTo(null);
        return true;
      }
    } else if (isEmptyData(from) && !isEmptyData(to)) {
      if (!validateDate(to)) {
        form.setFields([{ name: "to", errors: ["Ng??y kh??ng h???p l???"] }]);
        return false;
      } else {
        const toTime = moment(to, "DD/MM/YYYY")._d.getTime() + bonusTimeTo;
        setTimeFrom(null);
        setTimeTo(toTime);
        return true;
      }
    } else if (!isEmptyData(from) && !isEmptyData(to)) {
      if (!validateDate(from) && validateDate(to)) {
        form.setFields([{ name: "from", errors: ["Ng??y kh??ng h???p l???"] }]);
        return false;
      } else if (validateDate(from) && !validateDate(to)) {
        form.setFields([{ name: "to", errors: ["Ng??y kh??ng h???p l???"] }]);
        return false;
      } else if (validateDate(from) && validateDate(to)) {
        const fromTime = moment(from, "DD/MM/YYYY")._d.getTime();
        const toTime = moment(to, "DD/MM/YYYY")._d.getTime() + bonusTimeTo;

        if (fromTime > toTime) {
          form.setFields([{ name: "from", errors: ["L???c b??? l???i"] }]);
          return false;
        } else {
          setTimeFrom(fromTime);
          setTimeTo(toTime);
          return true;
        }
      } else {
        form.setFields([{ name: "from", errors: ["Ng??y kh??ng h???p l???"] }]);
        form.setFields([{ name: "to", errors: ["Ng??y kh??ng h???p l???"] }]);
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
        okText="T??m ki???m"
        cancelText="?????t l???i"
        onOk={() => form.submit()}
        onCancel={() => form.resetFields()}
      >
        <h2>T??m ki???m n??ng cao</h2>

        <br />

        <Form form={form} onFinish={onFinish} layout="vertical">
          {/* Ch???n lo??i */}
          <Form.Item label="Lo??i" name="type" initialValue={null}>
            <Select className="select" style={{ width: "100%" }} showSearch>
              <Select.Option value={null}>T???t c???</Select.Option>
              <Select.Option value="Ch??">Ch??</Select.Option>
              <Select.Option value="M??o">M??o</Select.Option>
            </Select>
          </Form.Item>

          {/* Ch???n gi???i t??nh */}
          <Form.Item label="Gi???i t??nh" name="gender" initialValue={null}>
            <Select className="select" style={{ width: "100%" }} showSearch>
              <Select.Option value={null}>T???t c???</Select.Option>
              <Select.Option value="?????c">?????c</Select.Option>
              <Select.Option value="C??i">C??i</Select.Option>
            </Select>
          </Form.Item>

          {/* Ch???n ng?????i c???u tr??? */}
          <Form.Item label="Ng?????i c???u tr???" name="rescuer" initialValue={null}>
            <Select className="select" style={{ width: "100%" }} showSearch>
              <Select.Option value={null}>T???t c???</Select.Option>
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

          {/* Ch???n kho???ng ng??y c???u tr??? */}
          <Row gutter={{ sm: 10 }}>
            <Col span={12}>
              {/* T??? ng??y... */}
              <Form.Item
                label="Ng??y c???u tr???"
                name="from"
                rules={[
                  {
                    pattern: /^([0-9]{2})\/([0-9]{2})\/([0-9]{4})$/,
                    message: "Sai DD/MM/YYYY",
                  },
                ]}
              >
                <Input
                  placeholder="T??? ng??y"
                  onChange={(e) => handleInputDateFrom(e)}
                />
              </Form.Item>
            </Col>

            <Col span={12}>
              {/* ?????n ng??y... */}
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
                  placeholder="?????n ng??y"
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
