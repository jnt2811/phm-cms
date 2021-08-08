import { Form, notification, Select } from "antd";
import { useForm } from "antd/lib/form/Form";
import { useEffect } from "react";
import { useDispatch, useSelector } from "react-redux";
import { FormModal } from "../../../../commons/commonModal/CommonModal";
import { failMessages, successMessages } from "../../../../constances/messages";
import { doUpdateSchedule } from "../../../../ducks/slices/volunteerSlice";
import { isEmptyData } from "../../../../utils";

const UpdateSchedule = ({ volunteer, visible, setVisible }) => {
  const [form] = useForm();
  const volunteerReducer = useSelector((state) => state.volunteer);
  const dispatch = useDispatch();

  useEffect(() => {
    if (!isEmptyData(volunteer)) {
      const { schedules } = volunteer;

      if (schedules.length > 0) {
        schedules.forEach((schedule) => {
          if (schedule.date === "2")
            form.setFieldsValue({ mon: schedule.shift });
          else if (schedule.date === "3")
            form.setFieldsValue({ tue: schedule.shift });
          else if (schedule.date === "4")
            form.setFieldsValue({ wed: schedule.shift });
          else if (schedule.date === "5")
            form.setFieldsValue({ thu: schedule.shift });
          else if (schedule.date === "6")
            form.setFieldsValue({ fri: schedule.shift });
          else if (schedule.date === "7")
            form.setFieldsValue({ sat: schedule.shift });
        });
      } else {
        form.setFields([
          { name: "mon", value: "Nghỉ" },
          { name: "tue", value: "Nghỉ" },
          { name: "wed", value: "Nghỉ" },
          { name: "thu", value: "Nghỉ" },
          { name: "fri", value: "Nghỉ" },
          { name: "sat", value: "Nghỉ" },
        ]);
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [visible]);

  useEffect(() => {
    const { isOk, message } = volunteerReducer;

    const successMessage = successMessages.UPDATE_SCHEDULE_VOLUNTEER;
    const failMessage = failMessages.UPDATE_SCHEDULE_VOLUNTEER;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      setVisible(false);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [volunteerReducer]);

  const onFinish = (values) => {
    const { mon, tue, wed, thu, fri, sat } = values;

    const data = {
      id: volunteer.id,
      data: [
        { date: "2", shift: mon },
        { date: "3", shift: tue },
        { date: "4", shift: wed },
        { date: "5", shift: thu },
        { date: "6", shift: fri },
        { date: "7", shift: sat },
      ],
    };

    dispatch(doUpdateSchedule(data));
    notification.open({ message: "Đang xử lý..." });
  };

  const renderFormItems = () => {
    let weekdays = [
      { id: 2, name: "mon" },
      { id: 3, name: "tue" },
      { id: 4, name: "wed" },
      { id: 5, name: "thu" },
      { id: 6, name: "fri" },
      { id: 7, name: "sat" },
    ];

    return weekdays.map((weekday) => (
      <Form.Item
        key={weekday.id}
        name={weekday.name}
        label={"Thứ " + weekday.id}
      >
        <Select className="select">
          <Select.Option value="Sáng">Sáng</Select.Option>
          <Select.Option value="Chiều">Chiều</Select.Option>
          <Select.Option value="Tối">Tối</Select.Option>
          <Select.Option value="Sáng & Chiều">Sáng & Chiều</Select.Option>
          <Select.Option value="Sáng & Tối">Sáng & Tối</Select.Option>
          <Select.Option value="Chiều & Tối">Chiều & Tối</Select.Option>
          <Select.Option value="Cả ngày">Cả ngày</Select.Option>
          <Select.Option value="Nghỉ">Nghỉ</Select.Option>
        </Select>
      </Form.Item>
    ));
  };

  return (
    <div className="update-schedule">
      <FormModal
        visible={visible}
        onOk={() => form.submit()}
        onCancel={() => setVisible(false)}
        okText="Cập nhật"
        cancelText="Quay lại"
      >
        <h1>Cập nhật lịch làm việc</h1>

        <h3>Tình nguyện viên: {volunteer && volunteer.name}</h3>

        <br />

        <Form form={form} onFinish={onFinish}>
          {renderFormItems()}
        </Form>
      </FormModal>
    </div>
  );
};

export default UpdateSchedule;
