import { Button, Col, Input, notification, Row } from "antd";
import NewDonator from "./NewDonator";
import { Prompt, useHistory } from "react-router-dom";
import { useState } from "react";
import "./newDonation.scss";
import OldDonator from "./OldDonator";
import { useForm } from "antd/lib/form/Form";
import { ArrowLeftOutlined } from "@ant-design/icons";
import pathNames from "../../../../../router/pathNames";
import { isEmptyData } from "../../../../../utils";
import { successMessages } from "../../../../../constances/messages";

const NewDonation = () => {
  const history = useHistory();
  const [form] = useForm();

  const [oldDonator, setOldDonator] = useState();
  const [isOldDonator, setIsOldDonator] = useState(true);
  const [amountVal, setAmountVal] = useState();

  const onCreateNewDonation = () => {
    if (!isOldDonator) {
      form.submit();
    } else {
      console.log(amountVal);
      console.log(oldDonator);
      notification.success({ message: successMessages.CREATE_NEW_DONATION });
      history.push(pathNames.ADMIN_DONATION);
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
              <NewDonator form={form} amountVal={amountVal} />
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
