/** @format */

import { Divider, Form, Input, Modal, message, notification } from "antd";
import { updateUser } from "../../../services/apiService";
import { useEffect, useState } from "react";

const ModalUpdateUser = ({ open, setOpen, fetchDataUser, data, setData }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);

  useEffect(() => {
    form.setFieldsValue(data);
  }, [data]);

  const onFinish = async (values) => {
    if (values.fullName || values.phone) {
      setIsSubmit(true);
      const res = await updateUser(values._id, values.fullName, values.phone);

      console.log("res up", res);
      setIsSubmit(false);
      if (res && res.data) {
        notification.success({
          message: "Updated successfully",
          description: `Updated Success : ${values.fullName} `,
        });
        setData({});
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
        forceRender
        title=<label>Thêm Mới Người Dùng</label>
        open={open}
        onOk={() => form.submit()}
        onCancel={() => setOpen(false)}
        confirmLoading={isSubmit}
      >
        <Divider />
        <Form
          form={form}
          name="update"
          labelCol={{ span: 8 }}
          wrapperCol={{ span: 24 }}
          initialValues={{ remember: true }}
          onFinish={onFinish}
          autoComplete="off"
          className="ModalUpdateUser-form"
          size="large"
        >
          <Form.Item
            hidden
            labelCol={{ span: 24 }}
            label="Id"
            name="_id"
            rules={[{ required: true, message: "Please input your fullname!" }]}
          >
            <Input />
          </Form.Item>
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
            label="Email"
            name="email"
            rules={[{ required: true, message: "Please input your email!" }]}
          >
            <Input disabled />
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

export default ModalUpdateUser;
