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
  Spin,
  Tabs,
} from "antd";
import "./home.scss";
import { AiFillFilter, AiOutlineReload } from "react-icons/ai";
import Footer from "../Footer";
import { useEffect, useState } from "react";
import {
  getBookCategory,
  getBookWithPaginate,
} from "../../services/apiService";
import { useNavigate } from "react-router-dom";
import slug from "slug";
import { useOutletContext } from "react-router-dom";
import useDebounce from "../../hooks/useDebounce";
const Home = () => {
  const [form] = Form.useForm();
  const navigate = useNavigate();

  const [optionCategory, setOptionCategory] = useState([]);
  const [listBook, setListBook] = useState([]);
  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-sold");
  const [isLoading, setIsLoading] = useState(false);

  const [total, setTotal] = useState(0);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(10);
  const URL_BACKEND = `${import.meta.env.VITE_BACKEND_URL}/images/book/`;

  const [queryHeader, setQueryHeader] = useOutletContext();
  const querySearch = useDebounce(queryHeader, 300);

  useEffect(() => {
    const fetchCategory = async () => {
      const res = await getBookCategory();
      if (res && res.data) {
        const newArr = res.data.map((item) => {
          return { value: item, label: item };
        });
        setOptionCategory(newArr);
      }
    };

    fetchCategory();
  }, []);

  const fetchDataBook = async () => {
    setIsLoading(true);
    let query = `current=${current}&pageSize=${pageSize}`;
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }

    if (querySearch) {
      query += `&mainText=/${querySearch}/i`;
    }

    const res = await getBookWithPaginate(query);
    setIsLoading(false);

    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  useEffect(() => {
    fetchDataBook();
  }, [current, pageSize, sortQuery, querySearch, filter]);

  const onChangePaginate = (curr, pageS) => {
    if (current !== curr) {
      setCurrent(curr);
    }
    if (pageSize !== pageS) {
      setPageSize(pageS);
      setCurrent(1);
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

  const onChangeTabs = (key) => {
    setSortQuery(key);
  };
  const items = [
    {
      key: "sort=-sold",
      label: `Phổ biến`,
      children: <></>,
    },
    {
      key: "sort=-updatedAt",
      label: `Hàng mới`,
      children: <></>,
    },
    {
      key: "sort=price",
      label: `Giá thấp đến cao`,
      children: <></>,
    },
    {
      key: "sort=-price",
      label: `Giá cao đến thấp`,
      children: <></>,
    },
  ];

  const onValuesChange = (changeValues, values) => {
    if (changeValues.category) {
      let categoryQuery = `category=${values.category.join(",")}`;
      setFilter(categoryQuery);
    }
  };

  const handleRedirectBook = (book) => {
    navigate(`/book/${slug(book.mainText)}?id=${book._id}`);
  };

  return (
    <div className="homepage-container">
      <Row gutter={40}>
        <Col xs={0} sm={0} md={4} className="homepage-sidebar">
          <div className="sidebar-wrapper">
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
            <Spin spinning={isLoading} tip="loading...">
              <Row className="customize-row">
                {listBook &&
                  listBook.length > 0 &&
                  listBook.map((book) => (
                    <div
                      className="column"
                      key={book._id}
                      onClick={() => handleRedirectBook(book)}
                    >
                      <div className="wrapper">
                        <div className="thumbnail">
                          <img src={`${URL_BACKEND}${book.thumbnail}`} />
                        </div>
                        <div className="content">
                          <div className="text">{book.mainText}</div>
                          <span className="price">
                            {new Intl.NumberFormat("vi-VI", {
                              style: "currency",
                              currency: "vnd",
                            }).format(book.price)}
                          </span>
                          <div className="rating">
                            <Rate
                              defaultValue={5}
                              style={{ color: "#ffce3d", fontSize: 10 }}
                            />
                            Đã bán {book.sold}
                          </div>
                        </div>
                      </div>
                    </div>
                  ))}
              </Row>
            </Spin>
            <Divider />
            <Row style={{ display: "flex", justifyContent: "center" }}>
              <Pagination
                onChange={onChangePaginate}
                current={current}
                total={total}
                pageSize={pageSize}
                responsive
              />
            </Row>
          </div>
          <Footer />
        </Col>
      </Row>
    </div>
  );
};

export default Home;
