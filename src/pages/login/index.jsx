/** @format */
import { Button, Form, Input, Divider, message, notification } from "antd";
import "./login.scss";
import { postLogin } from "../../services/apiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch } from "react-redux";
import { doLoginAction } from "../../redux/account/accountSlice";
const LoginPage = () => {
  const dispatch = useDispatch();
  const [isLoading, setIsLoading] = useState(false);
  const navigate = useNavigate();

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };
  const onFinish = (values) => {
    if (validateEmail(values.username) || values.password) {
      handlePostLogin(values);
    }
  };
  const handlePostLogin = async (values) => {
    setIsLoading(true);
    const res = await postLogin(values);
    if (res && res?.data?.user?.id) {
      localStorage.setItem("access_token", res.data.access_token);
      dispatch(doLoginAction(res.data.user));

      message.success("Đăng nhập tài khoản thành công");
      setIsLoading(false);
      navigate("/");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: "Thông tin đăng nhập không chính xác!",
        duration: 5,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="login-pages">
      <div className="login-container">
        <h3>Đăng nhập người dùng</h3>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="login-form"
          size="large"
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="UserName"
            name="username"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Mật khẩu"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
          >
            <Input.Password />
          </Form.Item>

          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Đăng nhập
            </Button>
          </Form.Item>
          <Divider plain>Or</Divider>
          <div className="form-help">
            Chưa có tài khoản ?
            <a onClick={() => navigate("/register")}>Đăng ký</a>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default LoginPage;
