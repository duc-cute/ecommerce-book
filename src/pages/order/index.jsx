/** @format */

import { Breadcrumb, Button, Result, Row, Steps } from "antd";
import { HomeOutlined, SmileOutlined } from "@ant-design/icons";
import Footer from "../../components/Footer";
import ViewOrder from "./ViewOrder";
import { useState } from "react";
import Payment from "./Payment";
import { Link, useNavigate } from "react-router-dom";

const OrderPage = () => {
  const [step, setStep] = useState(0);
  const navigate = useNavigate();
  const itemsBreadcrumb = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
    {
      title: <span style={{ fontWeight: 500 }}>Mua hàng</span>,
    },
  ];
  return (
    <>
      <div className="breadcrum-block">
        <Breadcrumb items={itemsBreadcrumb} />
      </div>
      <div className="orderpage-container">
        <Row gutter={20}>
          <div className="order-step">
            <Steps
              size="small"
              current={step}
              status="finish"
              items={[
                {
                  title: "Đơn hàng",
                },
                {
                  title: "Đặt hàng",
                },
                {
                  title: "Thanh toán",
                },
              ]}
            />
          </div>
        </Row>
        {step === 0 && <ViewOrder setStep={setStep} />}
        {step === 1 && <Payment setStep={setStep} />}
        {step === 2 && (
          <Result
            icon={<SmileOutlined />}
            title="Đặt hàng thành công!"
            extra={
              <Button type="primary" onClick={() => navigate("/history")}>
                Lịch sử
              </Button>
            }
          />
        )}
      </div>
      <Footer />
    </>
  );
};

export default OrderPage;
