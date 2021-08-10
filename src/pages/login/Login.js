import { Button, Col, Form, Input, Row, notification } from "antd";
import "./login.scss";
import CorgiImg from "../../assets/corgi.png";
import { useForm } from "antd/lib/form/Form";
import { useDispatch, useSelector } from "react-redux";
import { doLogin, resetAuth } from "../../ducks/slices/authSlice";
import { useEffect } from "react";
import { useState } from "react";
import { firestore } from "../../firebase";

const Login = () => {
  const authReducer = useSelector((state) => state.auth);
  const dispatch = useDispatch();

  const [isLoading, setIsLoading] = useState(false);

  useEffect(() => {
    if (authReducer.isOk === true) {
      const { userData } = authReducer;

      const usersRef = firestore.collection("users");

      usersRef
        .where("uid", "==", `${userData.id}`)
        .get()
        .then((docs) => {
          if (docs.size === 0) {
            usersRef
              .add({
                uid: `${userData.id}`,
                name: userData.rest.name,
                avatar: userData.rest.avatar,
              })
              .then(() => {
                console.log("created");

                setIsLoading(false);
                notification.success({ message: authReducer.message });
                dispatch(resetAuth());
                window.location.reload();
              });
          } else {
            let uid = "";
            docs.forEach((doc) => {
              uid = doc.id;
              localStorage.setItem(
                "user-firebase",
                JSON.stringify({ id: doc.id, ...doc.data() })
              );
            });

            usersRef
              .doc(uid)
              .update({
                name: userData.rest.name,
                avatar: userData.rest.avatar,
              })
              .then(() => {
                console.log("updated");

                setIsLoading(false);
                notification.success({ message: authReducer.message });
                dispatch(resetAuth());
                window.location.reload();
              });
          }
        })
        .catch((e) => console.log(e));
    } else if (authReducer.isOk === false) {
      setIsLoading(false);
      notification.error({ message: authReducer.message });
      dispatch(resetAuth());
    }
  }, [authReducer, dispatch]);

  const [form] = useForm();

  const onFinish = (values) => {
    setIsLoading(true);
    dispatch(doLogin(values));
  };

  return (
    <div className="login">
      <Row justify="space-between" align="middle">
        <Col lg={10}>
          <img src={CorgiImg} alt="" />
        </Col>

        <Col lg={12}>
          <h1>Đăng nhập</h1>

          <Form layout="vertical" form={form} onFinish={onFinish}>
            <Form.Item
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Hãy nhập số điện thoại" }]}
            >
              <Input />
            </Form.Item>

            <Form.Item
              label="Mật khẩu"
              name="password"
              rules={[{ required: true, message: "Hãy nhập mật khẩu" }]}
            >
              <Input.Password className="input-password" />
            </Form.Item>

            <Form.Item>
              <Button htmlType="submit" block loading={isLoading}>
                Đăng nhập
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default Login;
