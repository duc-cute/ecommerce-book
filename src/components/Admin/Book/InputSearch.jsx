/** @format */

import { Input, Form, Button } from "antd";

const InputSearch = ({ fetchDataBook, setFilter }) => {
  const [form] = Form.useForm();
  const onFinish = (values) => {
    let query = "";
    if (values.mainText) {
      query += `&mainText=/${values.mainText}/i`;
    }
    if (values.author) {
      query += `&author=/${values.author}/i`;
    }
    if (values.category) {
      query += `&category=/${values.category}/i`;
    }

    if (query) {
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
            label="Tên sách"
            name="mainText"
            className="input-item"
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Tác giả"
            name="author"
            className="input-item"
          >
            <Input />
          </Form.Item>
          <Form.Item
            labelCol={{ span: 24 }}
            label="Thể loại"
            name="category"
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
