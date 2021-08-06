import { Form, Select, Row, Col } from "antd";
import { useEffect, useState } from "react";
import { isEmptyData } from "../../../../utils";
import addressGetter from "./addressGetter";

const AddressSelector = ({
  form,
  required = true,
  initialValue,
  resetCode = false,
  setResetCode,
}) => {
  const [provinceList, setProvinceList] = useState([]);
  const [districtList, setDistrictList] = useState([]);
  const [wardList, setWardList] = useState([]);
  const [provinceCode, setProvinceCode] = useState();
  const [districtCode, setDistrictCode] = useState();
  const [countFixBugDistrict, setCountFixBugDistrict] = useState(false);
  const [countFixBugWard, setCountFixBugWard] = useState(false);

  useEffect(() => {
    if (resetCode === true) {
      setProvinceCode(null);
      setDistrictCode(null);
      setDistrictList([]);
      setWardList([]);
      setResetCode(false);
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [resetCode]);

  // tự dộng cập nhật danh sách tỉnh thành khi khởi tạo
  useEffect(() => {
    addressGetter
      .getAllProvinces()
      .then((provinces) => {
        setProvinceList(provinces);
      })
      .then(() => {
        if (!isEmptyData(initialValue)) {
          const { province, district, ward } = initialValue;

          if (!isEmptyData(province)) {
            const _province = province;
            setProvinceCode(_province.code);
            form.setFieldsValue({ province: JSON.stringify(province) });
          }

          if (!isEmptyData(district)) {
            const _district = district;
            setDistrictCode(_district.code);
            form.setFieldsValue({ district: JSON.stringify(district) });
          }

          if (!isEmptyData(ward))
            form.setFieldsValue({ ward: JSON.stringify(ward) });
        }
      });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, []);

  // tự động cập nhật danh sách quận huyện khi chọn 1 tỉnh thành
  useEffect(() => {
    if (provinceCode) {
      if (!countFixBugDistrict) {
        addressGetter.getAllDistricts(provinceCode).then((districts) => {
          setDistrictList(districts);
        });

        form.resetFields(["district"]);

        setCountFixBugDistrict(true);
      } else {
        addressGetter.getAllDistricts(provinceCode).then((districts) => {
          setDistrictList(districts);
          setWardList([]);
        });

        form.setFieldsValue({ district: null, ward: null });
      }
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [provinceCode]);

  // tự động cập nhật danh sách xã phường khi chọn 1 quận huyện
  useEffect(() => {
    if (districtCode) {
      addressGetter.getAllWards(districtCode).then((wards) => {
        setWardList(wards);
      });

      if (!countFixBugWard) {
        form.resetFields(["ward"]);
        setCountFixBugWard(true);
      } else form.setFieldsValue({ ward: null });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [districtCode]);

  const onChangeProvince = (value) => {
    const { code } = JSON.parse(value);

    setProvinceCode(code);
    setDistrictCode(null);
  };

  const onChangeDistrict = (value) => {
    const districtCode = JSON.parse(value).code;

    setDistrictCode(districtCode);
  };

  return (
    <Row gutter={{ sm: 10 }}>
      <Col span={8}>
        <Form.Item
          name="province"
          label="Tỉnh thành"
          rules={[{ required: required, message: "Hãy chọn tỉnh thành" }]}
        >
          <Select className="select" onChange={onChangeProvince} showSearch>
            {provinceList.map((province) => (
              <Select.Option key={province.id} value={JSON.stringify(province)}>
                {province.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name="district"
          label="Quận huyện"
          rules={[{ required: required, message: "Hãy chọn quận huyện" }]}
        >
          <Select className="select" onChange={onChangeDistrict} showSearch>
            {districtList.map((district) => (
              <Select.Option key={district.id} value={JSON.stringify(district)}>
                {district.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>

      <Col span={8}>
        <Form.Item
          name="ward"
          label="Xã phường"
          rules={[{ required: required, message: "Hãy chọn xã phường" }]}
        >
          <Select className="select" showSearch>
            {wardList.map((ward) => (
              <Select.Option key={ward.id} value={JSON.stringify(ward)}>
                {ward.name}
              </Select.Option>
            ))}
          </Select>
        </Form.Item>
      </Col>
    </Row>
  );
};

export default AddressSelector;
