import { Col, DatePicker, Form, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../../commons/commonModal/CommonModal";
import { doGetAllPets, resetPet } from "../../../../../ducks/slices/petSlice";
import {
  doGetAllClinics,
  resetClinic,
} from "../../../../../ducks/slices/clinicSlice";

const NewAppointment = ({ visible, setVisible }) => {
  const petReducer = useSelector((state) => state.pet);
  const clinicReducer = useSelector((state) => state.clinic);
  const dispatch = useDispatch();

  const [form] = useForm();

  const [pets, setPets] = useState([]);
  const [clinics, setClinics] = useState([]);

  useEffect(() => {
    dispatch(doGetAllPets());
    dispatch(doGetAllClinics());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    if (petReducer.isOk === true) {
      const { petList } = petReducer;
      setPets(petList);
      dispatch(resetPet());
    } else if (petReducer.isOk === false) {
      console.log(petReducer.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [petReducer]);

  useEffect(() => {
    if (clinicReducer.isOk === true) {
      const { clinicList } = clinicReducer;
      setClinics(clinicList);
      dispatch(resetClinic());
    } else if (clinicReducer.isOk === false) {
      console.log(clinicReducer.message);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [clinicReducer]);

  const onCancel = () => {
    form.resetFields();
    setVisible(false);
  };

  const onFinish = (values) => {
    const appointment = {
      ...values,
      pet: JSON.parse(values.pet),
      clinic: JSON.parse(values.clinic),
    };
    console.log(appointment);
    form.resetFields();
    setVisible(false);
  };

  return (
    <FormModal
      visible={visible}
      onOk={() => form.submit()}
      onCancel={onCancel}
      cancelText="Hủy bỏ"
      okText="Tạo mới"
    >
      <h1>Tạo mới lịch hẹn</h1>

      <br />

      <Form layout="vertical" form={form} onFinish={onFinish}>
        <Form.Item
          label="Chọn chó mèo"
          name="pet"
          rules={[{ required: true, message: "Hãy chọn chó mèo" }]}
        >
          <Select className="select" showSearch>
            {pets.map((pet) => (
              <Select.Option key={pet.id} value={JSON.stringify(pet)}>
                {pet.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>

        <Row gutter={{ lg: 20 }}>
          <Col lg={12}>
            <Form.Item
              label="Chọn thời điểm"
              name="date"
              rules={[{ required: true, message: "Hãy chọn thời điểm" }]}
            >
              <DatePicker
                style={{ width: "100%" }}
                className="date-picker"
                placeholder="DD/MM/YYYY"
                format="DD/MM/YYYY"
              />
            </Form.Item>
          </Col>

          <Col lg={12}>
            <Form.Item
              label="Chọn thời gian"
              name="time"
              rules={[{ required: true, message: "Hãy chọn thời gian" }]}
            >
              <DatePicker.TimePicker
                style={{ width: "100%" }}
                className="date-picker"
                placeholder="HH:mm"
                showSecond={false}
                format="HH:mm"
              />
            </Form.Item>
          </Col>
        </Row>

        <Form.Item
          label="Chọn phòng khám"
          name="clinic"
          rules={[{ required: true, message: "Hãy chọn phòng khám" }]}
        >
          <Select className="select" showSearch>
            {clinics.map((clinic) => (
              <Select.Option key={clinic.id} value={JSON.stringify(clinic)}>
                {clinic.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Form>
    </FormModal>
  );
};

export default NewAppointment;
