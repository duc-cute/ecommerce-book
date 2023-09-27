/** @format */

import { HomeOutlined, CloseOutlined } from "@ant-design/icons";
import {
  Breadcrumb,
  Col,
  Divider,
  Drawer,
  Form,
  Pagination,
  Rate,
  Row,
  Spin,
  Tabs,
  theme,
} from "antd";
import { useEffect, useState } from "react";
import { useNavigate, useOutletContext } from "react-router-dom";
import slug from "slug";
import useDebounce from "../../hooks/useDebounce";
import {
  getBookCategory,
  getBookWithPaginate,
} from "../../services/apiService";
import Footer from "../Footer";
import "./home.scss";
import SideBar from "./SideBar";
const Home = () => {
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

  const [queryHeader, setQueryHeader, showSideBar, setShowSideBar] =
    useOutletContext();
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

  const handleRedirectBook = (book) => {
    navigate(`/book/${slug(book.mainText)}?id=${book._id}`);
  };
  const itemsBreadcrumb = [
    {
      href: "",
      title: <HomeOutlined />,
    },
    {
      href: "",
      title: (
        <>
          <span className="breadcrumb-item">Trang chủ</span>
        </>
      ),
    },
  ];

  return (
    <>
      <div className="homepage-container">
        <div className="breadcrum-block" style={{ marginLeft: 0 }}>
          <Breadcrumb items={itemsBreadcrumb} />
        </div>
        <Row gutter={40}>
          <Col xs={0} sm={0} md={4} className="homepage-sidebar">
            <SideBar setFilter={setFilter} optionCategory={optionCategory} />
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
                  {listBook && listBook.length === 0 && (
                    <p
                      style={{
                        minHeight: "60vh",
                        display: "flex",
                        alignItems: "center",
                      }}
                    >
                      Không có sản phẩm nào được tìm thấy!
                    </p>
                  )}
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
      {showSideBar && (
        <Drawer
          title={<span style={{ fontWeight: 500 }}>Lọc sản phẩm</span>}
          placement="right"
          closable={() => setShowSideBar(false)}
          closeIcon={<CloseOutlined />}
          onClose={() => setShowSideBar(false)}
          open={true}
          getContainer={false}
          size="50%"
        >
          <SideBar
            setFilter={setFilter}
            showSideBar={showSideBar}
            optionCategory={optionCategory}
          />
        </Drawer>
      )}
    </>
  );
};

export default Home;
