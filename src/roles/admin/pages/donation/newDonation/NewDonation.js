import { Button, Col, Input, notification, Row } from "antd";
import NewDonator from "./NewDonator";
import { Prompt, useHistory } from "react-router-dom";
import { useEffect, useState } from "react";
import "./newDonation.scss";
import OldDonator from "./OldDonator";
import { useForm } from "antd/lib/form/Form";
import { ArrowLeftOutlined } from "@ant-design/icons";
import pathNames from "../../../../../router/pathNames";
import { isEmptyData } from "../../../../../utils";
import {
  failMessages,
  successMessages,
} from "../../../../../constances/messages";
import { useDispatch, useSelector } from "react-redux";
import { doCreateDonation } from "../../../../../ducks/slices/donationSlice";

const NewDonation = () => {
  const donationReducer = useSelector((state) => state.donation);
  const dispatch = useDispatch();

  const history = useHistory();
  const [form] = useForm();

  const [oldDonator, setOldDonator] = useState();
  const [isOldDonator, setIsOldDonator] = useState(true);
  const [amountVal, setAmountVal] = useState();

  useEffect(() => {
    const { isOk, message } = donationReducer;

    const successMessage = successMessages.CREATE_NEW_DONATION;
    const failMessage = failMessages.CREATE_NEW_DONATION;

    if (isOk === true && message === successMessage) {
      notification.success({ message: successMessage });
      form.resetFields();
      history.push(pathNames.ADMIN_DONATION);
    } else if (isOk === false && message === failMessage) {
      notification.error({ message: failMessage });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [donationReducer]);

  const onCreateNewDonation = () => {
    if (!isOldDonator) {
      form.submit();
    } else {
      const data = { amount: amountVal, donator: oldDonator };
      dispatch(doCreateDonation(data));
    }
  };

  const hanldeDisabledCreateButton = () => {
    if (/^\d+$/.test(amountVal)) {
      if (!isOldDonator) return false;
      else {
        if (!isEmptyData(oldDonator)) return false;
        else return true;
      }
    } else return true;
  };

  const dispatchForNewDonator = (donator) => {
    const data = { amount: amountVal, donator: donator };
    dispatch(doCreateDonation(data));
  };

  return (
    <>
      <Prompt
        when={false}
        message="Bạn đang rời khỏi trang này, những thay đổi sẽ không được lưu lại. Bạn chắc chắn chứ?"
      />

      <div className="new-donation">
        <Row gutter={{ sm: 10 }} align="middle">
          <Col>
            <Button
              onClick={() => history.push(pathNames.ADMIN_DONATION)}
              icon={<ArrowLeftOutlined />}
              className="back-btn"
            ></Button>
          </Col>

          <Col>
            <h1>Tạo mới quyên góp</h1>
          </Col>
        </Row>

        <br />
        <br />

        <Row gutter={{ sm: 50 }}>
          <Col span={16}>
            <Row className="donator-btns" gutter={{ sm: 10 }}>
              <Col>
                <Button
                  className={isOldDonator && "active"}
                  onClick={() => setIsOldDonator(true)}
                >
                  Người cũ
                </Button>
              </Col>

              <Col>
                <Button
                  className={!isOldDonator && "active"}
                  onClick={() => setIsOldDonator(false)}
                >
                  Người mới
                </Button>
              </Col>
            </Row>

            <br />
            <br />

            {isOldDonator ? (
              <OldDonator setDonator={setOldDonator} />
            ) : (
              <NewDonator
                form={form}
                dispatchForNewDonator={dispatchForNewDonator}
              />
            )}
          </Col>

          <Col span={8}>
            <h4>Số tiền</h4>

            <Input onChange={(e) => setAmountVal(e.target.value)} />

            <br />
            <br />

            <Button
              block
              onClick={onCreateNewDonation}
              disabled={hanldeDisabledCreateButton()}
            >
              Tạo mới
            </Button>
          </Col>
        </Row>
      </div>
    </>
  );
};

export default NewDonation;
