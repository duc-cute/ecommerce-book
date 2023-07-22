/** @format */

import {
  Button,
  Checkbox,
  Col,
  Divider,
  Form,
  InputNumber,
  Pagination,
  Rate,
  Row,
  Tabs,
} from "antd";
import "./home.scss";
import { AiFillFilter, AiOutlineReload } from "react-icons/ai";
import Footer from "../Footer";
const Home = () => {
  const onFinish = (values) => {
    // console.log("Success:", values);
  };

  const onChangeTabs = (key) => {
    console.log(key);
  };
  const items = [
    {
      key: "1",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "2",
      label: `Hàng mới`,
      children: <></>,
    },
    {
      key: "3",
      label: `Giá thấp đến cao`,
      children: <></>,
    },
    {
      key: "4",
      label: `Giá cao đến thấp`,
      children: <></>,
    },
  ];

  const onValuesChange = (changeValues, values) => {};
  return (
    <div className="homepage-container">
      <Row gutter={40}>
        <Col xs={0} sm={0} md={4} className="homepage-sidebar">
          <div className="filter-sidebar">
            <span className="icon-filter">
              <AiFillFilter style={{ display: "flex", color: "aqua" }} /> Bộ lọc
              tìm kiếm
            </span>
            <AiOutlineReload className="icon-filter" />
          </div>
          <Divider />
          <Form
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
                  <Col span={24}>
                    <Checkbox value="A">A</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="B">B</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="C">C</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="D">D</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="E">E</Checkbox>
                  </Col>
                  <Col span={24}>
                    <Checkbox value="F">F</Checkbox>
                  </Col>
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
                <span>-</span>
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
                <Button type="primary">Áp dụng</Button>
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
        </Col>
        <Col sm={24} md={20} style={{ paddingRight: "0" }}>
          <div className="homepage-content">
            <Row>
              <Tabs
                size="large"
                defaultActiveKey="1"
                items={items}
                onChange={onChangeTabs}
              />
            </Row>
            <Row className="customize-row">
              <div className="column">
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src="http://localhost:8080//images/book/15-afa213ab31cefd06d49b977a2f4ab594.jpg" />
                  </div>
                  <div className="content">
                    <div className="text">
                      Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu
                    </div>
                    <span className="price">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(70000)}
                    </span>
                    <div className="rating">
                      <Rate
                        defaultValue={5}
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      Đã bán 1k
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src="http://localhost:8080//images/book/15-afa213ab31cefd06d49b977a2f4ab594.jpg" />
                  </div>
                  <div className="content">
                    <div className="text">
                      Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu
                    </div>
                    <span className="price">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(70000)}
                    </span>
                    <div className="rating">
                      <Rate
                        defaultValue={5}
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      Đã bán 1k
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src="http://localhost:8080//images/book/15-afa213ab31cefd06d49b977a2f4ab594.jpg" />
                  </div>
                  <div className="content">
                    <div className="text">
                      Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu
                    </div>
                    <span className="price">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(70000)}
                    </span>
                    <div className="rating">
                      <Rate
                        defaultValue={5}
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      Đã bán 1k
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src="http://localhost:8080//images/book/15-afa213ab31cefd06d49b977a2f4ab594.jpg" />
                  </div>
                  <div className="content">
                    <div className="text">
                      Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu
                    </div>
                    <span className="price">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(70000)}
                    </span>
                    <div className="rating">
                      <Rate
                        defaultValue={5}
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      Đã bán 1k
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src="http://localhost:8080//images/book/15-afa213ab31cefd06d49b977a2f4ab594.jpg" />
                  </div>
                  <div className="content">
                    <div className="text">
                      Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu
                    </div>
                    <span className="price">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(70000)}
                    </span>
                    <div className="rating">
                      <Rate
                        defaultValue={5}
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      Đã bán 1k
                    </div>
                  </div>
                </div>
              </div>

              <div className="column">
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src="http://localhost:8080//images/book/15-afa213ab31cefd06d49b977a2f4ab594.jpg" />
                  </div>
                  <div className="content">
                    <div className="text">
                      Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu
                    </div>
                    <span className="price">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(70000)}
                    </span>
                    <div className="rating">
                      <Rate
                        defaultValue={5}
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      Đã bán 1k
                    </div>
                  </div>
                </div>
              </div>
              <div className="column">
                <div className="wrapper">
                  <div className="thumbnail">
                    <img src="http://localhost:8080//images/book/15-afa213ab31cefd06d49b977a2f4ab594.jpg" />
                  </div>
                  <div className="content">
                    <div className="text">
                      Truyện Tranh Đam Mỹ - Làm Dâu Nhà Sói - Hana Inu
                    </div>
                    <span className="price">
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(70000)}
                    </span>
                    <div className="rating">
                      <Rate
                        defaultValue={5}
                        style={{ color: "#ffce3d", fontSize: 10 }}
                      />
                      Đã bán 1k
                    </div>
                  </div>
                </div>
              </div>
            </Row>
            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination defaultCurrent={6} total={500} responsive />
            </Row>
          </div>
          <Footer />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
