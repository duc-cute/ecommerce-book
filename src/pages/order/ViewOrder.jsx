/** @format */

import "./order.scss";
import { Button, Col, Divider, InputNumber, Result, Row } from "antd";
import { FaTrash } from "react-icons/fa";
import { useDispatch, useSelector } from "react-redux";
import { SmileOutlined } from "@ant-design/icons";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import {
  doDeleteCartAction,
  doUpdateCartAction,
} from "../../redux/order/orderSlice";

const ViewOrder = ({ setStep }) => {
  const [total, setTotal] = useState(false);
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const URL_BACKEND = `${import.meta.env.VITE_BACKEND_URL}/images/book/`;

  const hanldeChangeInput = (value, book) => {
    if (!value || value < 0) return;
    if (!isNaN(value)) {
      dispatch(
        doUpdateCartAction({ quantity: value, detail: book, _id: book._id })
      );
    }
  };

  const { carts } = useSelector((state) => state.cart);

  useEffect(() => {
    const total = carts.reduce((acc, curr) => {
      const sum = acc + curr.quantity * curr.detail.price;

      return sum;
    }, 0);

    setTotal(total);
  }, [carts]);

  return (
    <Row gutter={20}>
      <Col xs={24} sm={24} md={18} className="list-item">
        {carts && carts.length > 0 ? (
          <>
            {carts.map((item) => (
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
                    <div className="quantity">
                      <InputNumber
                        style={{ width: "100px" }}
                        value={item.quantity}
                        min={0}
                        onChange={(value) => hanldeChangeInput(value, item)}
                      />
                    </div>
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
          </>
        ) : (
          <>
            {
              <Result
                icon=<SmileOutlined />
                title="Chưa có đơn hàng nào hãy thêm đơn hàng cho mình!"
                extra={
                  <Button type="primary" onClick={() => navigate("/")}>
                    Go home
                  </Button>
                }
              />
            }
          </>
        )}
      </Col>

      <Col md={6}>
        <div className="wrapper-pay">
          <div className="temp-price">
            <p>Tạm tính</p>
            <span>
              {new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "vnd",
              }).format(total)}
            </span>
          </div>
          <Divider />
          <div className="total-price">
            <p>Tổng tiền</p>
            <span>
              {new Intl.NumberFormat("vi-VI", {
                style: "currency",
                currency: "vnd",
              }).format(total)}
            </span>
          </div>
          <Divider />

          <Button
            className="shopping-btn"
            style={{
              display: "flex",
              alignItems: "center",
              justifyContent: "center",
              padding: "20px 0",
            }}
            onClick={() => setStep(1)}
            disabled={carts.length === 0}
          >
            Mua hàng({carts.length})
          </Button>
        </div>
      </Col>
    </Row>
  );
};

export default ViewOrder;
