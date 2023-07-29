/** @format */

import {
  Col,
  Divider,
  Form,
  Input,
  Radio,
  Row,
  message,
  notification,
} from "antd";
import { FaTrash } from "react-icons/fa";
import "./order.scss";
import { useDispatch, useSelector } from "react-redux";
import {
  doDeleteCartAction,
  doPlaceCartAction,
} from "../../redux/order/orderSlice";
import { useEffect, useState } from "react";
import TextArea from "antd/es/input/TextArea";
import { LoadingOutlined } from "@ant-design/icons";
import { postNewOrder } from "../../services/apiService";
const Payment = ({ setStep }) => {
  const [form] = Form.useForm();
  const [total, setTotal] = useState(false);
  const [isSubmit, setIsSubmit] = useState(false);
  const dispatch = useDispatch();
  const URL_BACKEND = `${import.meta.env.VITE_BACKEND_URL}/images/book/`;

  const { carts } = useSelector((state) => state.cart);
  const user = useSelector((state) => state.account.user);

  useEffect(() => {
    const total = carts.reduce((acc, curr) => {
      const sum = acc + curr.quantity * curr.detail.price;

      return sum;
    }, 0);

    setTotal(total);
  }, [carts]);

  const onFinish = async (values) => {
    setIsSubmit(true);
    const detailOrder = carts.map((item) => {
      return {
        bookName: item.detail.mainText,
        quantity: item.quantity,
        _id: item._id,
      };
    });
    const info = {
      name: values.username,
      address: values.address,
      phone: values.phone,
      totalPrice: total,
      detail: detailOrder,
    };

    const res = await postNewOrder(info);
    setIsSubmit(false);
    if (res && res.data) {
      message.success("Đặt hàng thành công");
      dispatch(doPlaceCartAction());
      setStep(2);
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: `${res.message}`,
      });
    }
  };

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
                form={form}
                name="basic"
                initialValues={{ remember: true }}
                onFinish={onFinish}
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
              </Form>

              <Radio checked className="payment-online">
                Thanh toán khi nhận hàng
              </Radio>
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

              <button
                disabled={isSubmit}
                className="shopping-btn"
                onClick={() => form.submit()}
              >
                {isSubmit && (
                  <span>
                    <LoadingOutlined />
                    &nbsp;
                  </span>
                )}
                Đặt hàng({carts.length})
              </button>
            </div>
          </div>
        </div>
      </Col>
    </Row>
  );
};

export default Payment;
