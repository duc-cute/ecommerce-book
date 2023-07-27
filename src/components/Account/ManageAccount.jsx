/** @format */

import { AntDesignOutlined, UploadOutlined } from "@ant-design/icons";
import {
  Avatar,
  Button,
  Col,
  Input,
  Row,
  Upload,
  Form,
  message,
  notification,
} from "antd";
import { useDispatch, useSelector } from "react-redux";
import { updateInfoUser, uploadAvatar } from "../../services/apiService";
import { useState } from "react";
import {
  doUpdateUserInfoAction,
  doUploadAvatarAction,
} from "../../redux/account/accountSlice";

const ManageAccount = () => {
  const account = useSelector((state) => state.account);
  const tempAvatar = useSelector((state) => state?.account?.tempAvatar);
  const [userAvatar, setUserAvatar] = useState(account?.user?.avatar ?? "");
  const dispatch = useDispatch();

  const urlAvatar = `${import.meta.env.VITE_BACKEND_URL}images/avatar/${
    tempAvatar || account?.user?.avatar
  }`;

  const handleUploadAvatar = async ({ file, onSuccess, onError }) => {
    const res = await uploadAvatar(file);
    if (res && res.data) {
      setUserAvatar(res.data.fileUploaded);
      dispatch(doUploadAvatarAction({ avatar: res.data.fileUploaded }));
      onSuccess("ok");
    } else {
      onError("Lỗi khi upload !");
    }
  };

  const handleChange = ({ file }) => {
    if (file.status !== "uploading") {
    }
    if (file.status === "done") {
      message.success("Upload file  thành công");
    } else if (file.status === "erro") {
      message.success("Upload file  thất bại!!!");
    }
  };

  const onFinish = async ({ fullName, phone, _id }) => {
    const res = await updateInfoUser(fullName, userAvatar, phone, _id);
    if (res && res.data) {
      dispatch(doUpdateUserInfoAction({ avatar: userAvatar, phone, fullName }));
      message.success("Cập nhật người dùng thành công");
      localStorage.removeItem("access_token");
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
          <Row gutter={20}>
            <Col span={24}>
              <Avatar
                size={{ md: 80, lg: 128, xl: 160 }}
                icon={<AntDesignOutlined />}
                src={urlAvatar}
                shape="circle"
              />
            </Col>
            <Col span={24} style={{ marginTop: "24px" }}>
              <Upload
                customRequest={handleUploadAvatar}
                maxCount={1}
                multiple={false}
                showUploadList={false}
                onChange={handleChange}
              >
                <Button icon={<UploadOutlined />}>Upload Avatar</Button>
              </Upload>
            </Col>
          </Row>
        </Col>
        <Col span={12}>
          <Form
            name="basic"
            initialValues={{ remember: true }}
            onFinish={onFinish}
            autoComplete="off"
            className="account-form"
          >
            <Form.Item
              labelCol={{ span: 24 }}
              label="ID"
              name="_id"
              initialValue={account.user.id}
              hidden
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Email"
              name="email"
              initialValue={account.user.email}
            >
              <Input disabled />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Tên hiển thị"
              name="fullName"
              rules={[{ required: true, message: "Please input your name!" }]}
              initialValue={account.user.fullName}
            >
              <Input />
            </Form.Item>
            <Form.Item
              labelCol={{ span: 24 }}
              label="Số điện thoại"
              name="phone"
              rules={[{ required: true, message: "Please input your phone!" }]}
              initialValue={account.user.phone}
            >
              <Input />
            </Form.Item>

            <Form.Item>
              <Button type="primary" htmlType="submit">
                Cập nhật
              </Button>
            </Form.Item>
          </Form>
        </Col>
      </Row>
    </div>
  );
};

export default ManageAccount;
