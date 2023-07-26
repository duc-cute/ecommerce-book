/** @format */

import { Col, Divider, Form, Input, Radio, Row } from "antd";
import { FaTrash } from "react-icons/fa";
import "./order.scss";
import { useDispatch, useSelector } from "react-redux";
import { doDeleteCartAction } from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
const Payment = ({ setStep }) => {
  const [total, setTotal] = useState(false);
  const dispatch = useDispatch();
  const URL_BACKEND = "http://localhost:8080//images/book/";

  const { carts } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    const total = carts.reduce((acc, curr) => {
      const sum = acc + curr.quantity * curr.detail.price;

      return sum;
    }, 0);

    setTotal(total);
  }, [carts]);

  const onFinish = (values) => {};

  return (
    <Row gutter={20}>
      <Col xs={24} sm={24} md={16} className="list-item">
        {carts &&
          carts.length > 0 &&
          carts.map((item) => (
            <div className="wrapper-item" key={`item-${item._id}`}>
              <div className="book-item">
                <div className="image">
                  <img src={`${URL_BACKEND}${item.detail.thumbnail}`} />
                </div>
                <p className="name">{item.detail.mainText}</p>
              </div>
              <div className="info">
                <div className="group">
                  <span className="price">
                    {new Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "vnd",
                    }).format(item.detail.price)}
                  </span>
                  <div className="quantity">Số lượng: {item.quantity}</div>
                </div>
                <span className="total">
                  Tổng&nbsp;
                  {new Intl.NumberFormat("vi-VI", {
                    style: "currency",
                    currency: "vnd",
                  }).format(item.detail.price * item.quantity)}
                </span>
                <span
                  className="delete"
                  onClick={() => dispatch(doDeleteCartAction(item._id))}
                >
                  <FaTrash />
                </span>
              </div>
            </div>
          ))}
      </Col>

      <Col md={8}>
        <div className="wrapper-pay" style={{ paddingBottom: "24px" }}>
          <div className="pay-pages">
            <div className="pay-container">
              <Form
                name="basic"
                labelCol={{ span: 8 }}
                wrapperCol={{ span: 24 }}
                initialValues={{ remember: true }}
                onFinish={onFinish}
                autoComplete="off"
                className="pay-form"
              >
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Tên người nhận"
                  name="username"
                  rules={[
                    { required: true, message: "Please input your name!" },
                  ]}
                  initialValue={user.fullName}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Số điện thoại"
                  name="phone"
                  initialValue={user.phone}
                >
                  <Input />
                </Form.Item>
                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Địa chỉ"
                  name="address"
                  rules={[
                    { required: true, message: "Please input your address!" },
                  ]}
                >
                  <TextArea rows={4} />
                </Form.Item>

                <Form.Item
                  labelCol={{ span: 24 }}
                  label="Phương thức thanhh toán"
                  name="optionPay"
                >
                  <Radio value="payment-online">Thanh toán khi nhận hàng</Radio>
                </Form.Item>
                <Divider />
                <div
                  className="total-payment"
                  style={{ display: "flex", justifyContent: "space-between" }}
                >
                  <label>Tổng tiền</label>
                  <span style={{ fontSize: "24px", color: "#ff424e" }}>
                    {new Intl.NumberFormat("vi-VI", {
                      style: "currency",
                      currency: "vnd",
                    }).format(total)}
                  </span>
                </div>
                <Divider />

                <button className="shopping-btn" onClick={() => setStep(2)}>
                  Đặt hàng({carts.length})
                </button>
              </Form>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Payment;
