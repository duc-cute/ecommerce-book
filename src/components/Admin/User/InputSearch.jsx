/** @format */

import { Input, Form, Button } from "antd";

const InputSearch = () => {
  const onFinish = (values) => {
    console.log("values", values);
  };
  return (
    <>
      <Form
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        className="group-form"
        size="large"
      >
        <Form.Item
          labelCol={{ span: 24 }}
          label="Name"
          name="username"
          className="input-item"
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Email"
          name="email"
          className="input-item"
        >
          <Input />
        </Form.Item>
        <Form.Item
          labelCol={{ span: 24 }}
          label="Số điện thoại"
          name="email"
          className="input-item"
        >
          <Input />
        </Form.Item>
      </Form>
      <div className="button-group">
        <Button type="primary">Search</Button>
        <Button>Clear</Button>
      </div>
    </>
  );
};

export default InputSearch;
