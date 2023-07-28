/** @format */

import { Button, Col, Form, Input, Row, message, notification } from "antd";
import { useSelector } from "react-redux";
import { changePassword } from "../../services/apiService";

const ChangePassWord = () => {
  const account = useSelector((state) => state.account);

  const onFinish = async ({ email, oldPassword, newPassword }) => {
    const res = await changePassword(email, oldPassword, newPassword);
    if (res && res.data) {
      message.success("Đổi mật khẩu thành công");
      console.log("ré", res);
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra!!!",
        description: res.mesage,
      });
    }
  };
  return (
    <div style={{ minHeight: "400px" }}>
      <Row>
        <Col span={12}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="changePassword-form"
          >
            <Form.Item
              labelCol={{ span: 24 }}
              label="Email"
              name="email"
              initialValue={account.user.email}
              rules={[{ required: true, message: "Please input your name!" }]}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu hiện tại"
              name="oldPassword"
              rules={[
                { required: true, message: "Please input your old password!" },
              ]}
            >
              <Input.Password />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Mật khẩu mới"
              name="newPassword"
              rules={[
                { required: true, message: "Please input your new password!" },
              ]}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Xác nhận
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ChangePassWord;
