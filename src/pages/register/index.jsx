/** @format */
import { Button, Form, Input, Divider, message, notification } from "antd";
import "./register.scss";
import { postRegister } from "../../services/apiService";
import { useState } from "react";
import { useNavigate } from "react-router-dom";
const RegisterPage = () => {
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
    if (
      !values.fullName ||
      validateEmail(values.email) ||
      !values.password ||
      !values.phone
    ) {
      handlePostRegister(values);
    }
  };
  const handlePostRegister = async (values) => {
    setIsLoading(true);
    const res = await postRegister(values);
    if (res && res?.data?._id) {
      message.success("Đăng kí tài khoản thành công");
      setIsLoading(false);
      navigate("/login");
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description:
          res.message && res.message.length > 0 ? res.message : res.message,
        duration: 5,
      });
      setIsLoading(false);
    }
  };

  return (
    <div className="register-pages">
      <div className="register-container">
        <h3>Đăng kí người dùng mới</h3>
        <Divider />
        <Form
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="register-form"
          size="large"
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Họ tên"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Email"
            name="email"
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
          <Form.Item
            labelCol={{ span: 24 }}
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
          <Form.Item wrapperCol={{ offset: 0, span: 16 }}>
            <Button type="primary" htmlType="submit" loading={isLoading}>
              Đăng kí
            </Button>
          </Form.Item>
          <Divider plain>Or</Divider>
          <div className="form-help">
            Đã có tài khoản ?{" "}
            <a onClick={() => navigate("/login")}>Đăng nhập</a>
          </div>
        </Form>
      </div>
    </div>
  );
};
export default RegisterPage;
