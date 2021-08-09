import { Button, Col, Form, Input, notification, Row, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import "./newReport.scss";
import VaccineInput from "./VaccineInput";
import DiagnosisInput from "./DiagnosisInput";
import AllergyInput from "./AllergyInput";
import SurgeryInput from "./SurgeryInput";
import PrescriptionInput from "./PrescriptionInput";
import { Prompt, useHistory, useParams } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { useEffect, useState } from "react";
import {
  doGetAllAppointmentsByClinic,
  resetAppointment,
} from "../../../../../../ducks/slices/appointmentSlice";
import pathNames from "../../../../../../router/pathNames";
import { ArrowLeftOutlined } from "@ant-design/icons";
import PetInfo from "./PetInfo";
import UploadReportImages from "./UploadReportImages";
import {
  doCreateReport,
  resetReport,
} from "../../../../../../ducks/slices/reportSlice";
import { successMessages } from "../../../../../../constances/messages";
import { requestDeleteAppointment } from "../../../../../../ducks/requests/appointmentRequest";

const NewReport = () => {
  const { id } = useParams();
  const history = useHistory();

  const [form] = useForm();

  const appointmentReducer = useSelector((state) => state.appointment);
  const reportReducer = useSelector((state) => state.report);
  const dispatch = useDispatch();

  const [appointment, setAppointment] = useState(null);
  const [reportImgs, setReportImgs] = useState([]);
  const [createSuccess, setCreateSuccess] = useState(false);

  useEffect(() => {
    dispatch(doGetAllAppointmentsByClinic());
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  useEffect(() => {
    const { isOk, message = "" } = appointmentReducer;

    if (isOk === true && message !== successMessages.DELETE_APPOINTMENT) {
      const { appointmentList = [] } = appointmentReducer;

      const tempAppointmentList = appointmentList.filter(
        (item) => item.id === parseInt(id)
      );

      if (tempAppointmentList.length > 0)
        setAppointment(tempAppointmentList[0]);
      else {
        history.push(pathNames.CLINIC_APPOINTMENT);
        notification.warning({ message: "Lịch hẹn không tồn tại" });
      }

      dispatch(resetAppointment());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [appointmentReducer]);

  useEffect(() => {
    const { isOk, message } = reportReducer;

    if (isOk === true) {
      notification.success({ message: message });
      dispatch(resetReport());
      setCreateSuccess(true);
    } else if (isOk === false) {
      notification.error({ message: message });
      dispatch(resetReport());
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [reportReducer]);

  useEffect(() => {
    if (createSuccess === true) {
      requestDeleteAppointment(appointment.id).then(() =>
        history.push(pathNames.CLINIC_REPORT)
      );
    }

    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [createSuccess]);

  const onFinish = (values) => {
    const data = {
      petId: appointment.pet.id,
      clinicId: appointment.clinic.id,
      images: JSON.stringify(reportImgs),
      weight: values.weight,
      overall: values.overall,
      allergies: JSON.stringify(values.allergies),
      vaccines: JSON.stringify(values.vaccines),
      surgeries: JSON.stringify(values.surgeries),
      diagnosis: JSON.stringify(values.diagnoses),
      prescription: JSON.stringify(values.prescriptions),
      note: values.note,
    };

    dispatch(doCreateReport(data));
    notification.open({ message: "Đang xử lý..." });
  };

  if (appointment === null) return <></>;

  return (
    <>
      <Prompt
        when={!createSuccess}
        message="Mọi thông tin bạn đã nhập sẽ không được lưu lại. Bạn chắc chắn muốn rời khỏi trang này chứ?"
      />

      <div className="new-report">
        <Row justify="space-between">
          <Col>
            <Row gutter={{ sm: 10 }} align="middle">
              <Col>
                <Button
                  onClick={() => history.push(pathNames.CLINIC_APPOINTMENT)}
                  icon={<ArrowLeftOutlined />}
                  className="back-btn"
                ></Button>
              </Col>

              <Col>
                <h1>Tạo mới báo cáo</h1>
              </Col>
            </Row>
          </Col>
        </Row>

        <br />
        <br />

        <Form form={form} onFinish={onFinish} layout="vertical">
          <Row gutter={{ sm: 50 }}>
            <Col flex="auto">
              <Row gutter={{ sm: 20 }}>
                <Col span={12}>
                  <Form.Item
                    label="Cân nặng (kg)"
                    name="weight"
                    rules={[{ required: true, message: "Hãy điền cân nặng" }]}
                  >
                    <Input />
                  </Form.Item>
                </Col>

                <Col span={12}>
                  <Form.Item
                    label="Tình trạng tổng quan"
                    name="overall"
                    rules={[
                      {
                        required: true,
                        message: "Hãy chọn tình trạng tổng quan",
                      },
                    ]}
                  >
                    <Select className="select">
                      <Select.Option value="Khỏe mạnh">Khỏe mạnh</Select.Option>
                      <Select.Option value="Ốm yếu">Ốm yếu</Select.Option>
                    </Select>
                  </Form.Item>
                </Col>
              </Row>

              <Row gutter={{ sm: 20 }}>
                <Col span={12}>
                  <VaccineInput />
                </Col>

                <Col span={12}>
                  <DiagnosisInput />
                </Col>
              </Row>

              <Row gutter={{ sm: 20 }}>
                <Col span={12}>
                  <AllergyInput />
                </Col>

                <Col span={12}>
                  <SurgeryInput />
                </Col>
              </Row>

              <PrescriptionInput />

              <label>Ảnh khám bệnh ({reportImgs.length} ảnh)</label>
              <UploadReportImages
                imageList={reportImgs}
                setImageList={setReportImgs}
              />
            </Col>

            <Col flex="500px">
              <PetInfo pet={appointment.pet} />

              <br />
              <br />

              <Form.Item
                label="Lời dặn"
                name="note"
                rules={[{ required: true, message: "Hãy điền lời dặn dò" }]}
              >
                <Input.TextArea rows={4} />
              </Form.Item>

              <Form.Item>
                <Button htmlType="submit" block>
                  Tạo mới
                </Button>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </div>
    </>
  );
};

export default NewReport;
