/** @format */

import { Divider, Form, Input, Modal, message, notification } from "antd";
import { postCreateUser } from "../../../../services/apiService";
import { useState } from "react";

const ModalCreateUser = ({ open, setOpen, fetchDataUser }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  const validateEmail = (email) => {
    return String(email)
      .toLowerCase()
      .match(
        /^(([^<>()[\]\\.,;:\s@"]+(\.[^<>()[\]\\.,;:\s@"]+)*)|.(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/
      );
  };

  const onFinish = async (values) => {
    if (
      values.fullName ||
      validateEmail(values.email) ||
      values.password ||
      values.phone
    ) {
      setIsSubmit(true);
      const res = await postCreateUser(values);
      setIsSubmit(false);
      if (res && res.data) {
        message.success("Thêm mới người dùng thành công");
        setOpen(false);
        form.resetFields();
        await fetchDataUser();
      } else {
        notification.error({
          message: "Đã có lỗi xảy ra",
          description: res.message,
        });
      }
    }
  };

  return (
    <>
      <Modal
        title={<label>Thêm Mới Người Dùng</label>}
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="ModalCreateUser-form"
          size="large"
        >
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tên hiển thị"
            name="fullName"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Password"
            name="password"
            rules={[{ required: true, message: "Please input your password!" }]}
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
            label="Số điện thoại"
            name="phone"
            rules={[
              { required: true, message: "Please input your phone number!" },
            ]}
          >
            <Input />
          </Form.Item>
        </Form>
      </Modal>
    </>
  );
};

export default ModalCreateUser;
