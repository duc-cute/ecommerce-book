/** @format */

import { Input, Form, Button } from "antd";

const InputSearch = ({ fetchDataUser, setFilter, setCurrent }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let query = "";
    if (values.username) {
      query += `&fullName=/${values.username}/i`;
    }
    if (values.email) {
      query += `&email=/${values.email}/i`;
    }
    if (values.phone) {
      query += `&phone=/${values.phone}/i`;
    }

    if (query) {
      setCurrent(1);
      setFilter(query);
    }
  };

  return (
    <>
      <Form
        form={form}
        name="basic"
        labelCol={{ span: 8 }}
        wrapperCol={{ span: 24 }}
        initialValues={{ remember: true }}
        onFinish={onFinish}
        autoComplete="off"
        size="large"
      >
        <div className="group-form">
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
            name="phone"
            className="input-item"
          >
            <Input />
          </Form.Item>
        </div>
        <Form.Item className="button-group">
          <Button type="primary" htmlType="submit">
            Search
          </Button>
          <Button
            onClick={() => {
              form.resetFields();
              fetchDataUser();
              setFilter("");
            }}
          >
            Clear
          </Button>
        </Form.Item>
      </Form>
    </>
  );
};

export default InputSearch;
