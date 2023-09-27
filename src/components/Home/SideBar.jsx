/** @format */

import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Rate,
  Row,
} from "antd";
import { AiFillFilter, AiOutlineReload } from "react-icons/ai";
import "./home.scss";
const SideBar = ({ setFilter, optionCategory, showSideBar }) => {
  const onValuesChange = (changeValues, values) => {
    if (changeValues.category) {
      let categoryQuery = `category=${values.category.join(",")}`;
      setFilter(categoryQuery);
    }
  };
  const onFinish = (values) => {
    if (values?.range?.from >= 0 && values?.range?.to > 0) {
      let priceQuery = `price>=${values?.range?.from}&price<=${values?.range?.to}`;
      if (values?.category?.length > 0) {
        priceQuery += `&category=${values.category.join(",")}`;
      }
      setFilter(priceQuery);
    }
  };
  const [form] = Form.useForm();

  return (
    <>
      <div className="sidebar-wrapper">
        {showSideBar ? (
          <></>
        ) : (
          <>
            <div className="filter-sidebar">
              <span className="icon-filter">
                <AiFillFilter style={{ display: "flex", color: "aqua" }} /> Bộ
                lọc tìm kiếm
              </span>
              <AiOutlineReload
                className="icon-filter"
                style={{ cursor: "pointer" }}
                onClick={() => {
                  form.resetFields();
                  setFilter("");
                }}
              />
            </div>
            <Divider />
          </>
        )}
        <Form
          form={form}
          onFinish={onFinish}
          onValuesChange={(changeValues, values) =>
            onValuesChange(changeValues, values)
          }
        >
          <Form.Item
            name="category"
            label="Danh mục sản phẩm"
            labelCol={{ span: "24" }}
          >
            <Checkbox.Group>
              <Row>
                {optionCategory &&
                  optionCategory.length > 0 &&
                  optionCategory.map((item, index) => (
                    <Col key={index} span={24} style={{ padding: "4px" }}>
                      <Checkbox value={item.value}>{item.label}</Checkbox>
                    </Col>
                  ))}
              </Row>
            </Checkbox.Group>
          </Form.Item>
          <Divider />
          <Form.Item label="Khoảng giá" labelCol={{ span: "24" }}>
            <div className="price-range">
              <Form.Item name={["range", "from"]}>
                <InputNumber
                  name="from"
                  min={0}
                  placeholder="đ Từ"
                  formatter={(value) =>
                    `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  }
                />
              </Form.Item>
              <span className="seperate">-</span>
              <Form.Item name={["range", "to"]}>
                <InputNumber
                  name="to"
                  min={0}
                  placeholder="đ Đến"
                  formatter={(value) =>
                    `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  }
                />
              </Form.Item>
            </div>
            <div className="btn-apply">
              <Button
                type="primary"
                size="middle"
                onClick={() => form.submit()}
              >
                Áp dụng
              </Button>
            </div>
          </Form.Item>
          <Divider />
          <Form.Item label="Đánh giá" labelCol={{ span: 24 }}>
            <div className="rate-item">
              <Rate defaultValue={5} disabled />
              <span className="rate-text">Từ 5 sao</span>
            </div>
            <div className="rate-item">
              <Rate defaultValue={4} disabled />
              <span className="rate-text">Từ 4 sao</span>
            </div>
            <div className="rate-item">
              <Rate defaultValue={3} disabled />
              <span className="rate-text">Từ 3 sao</span>
            </div>
            <div className="rate-item">
              <Rate defaultValue={2} disabled />
              <span className="rate-text">Từ 2 sao</span>
            </div>
            <div className="rate-item">
              <Rate defaultValue={1} disabled />
              <span className="rate-text">Từ 1 sao</span>
            </div>
          </Form.Item>
        </Form>
      </div>
    </>
  );
};

export default SideBar;
