/** @format */

import "./admin.scss";
import CountUp from "react-countup";
import { Card, Col, Row, Statistic } from "antd";
import { useState } from "react";
import { useEffect } from "react";
import { getDashBoard } from "../../services/apiService";
const AdminPage = () => {
  const [dataDashboard, setDataDashboard] = useState({
    countOrder: 0,
    countUser: 0,
  });

  useEffect(() => {
    const fetchDataDashboard = async () => {
      const res = await getDashBoard();
      if (res && res.data) {
        setDataDashboard(res.data);
      }
    };
    fetchDataDashboard();
  }, []);

  const formatter = (value) => <CountUp end={value} separator="," />;
  return (
    <>
      <Row gutter={16}>
        <Col span={10}>
          <Card bordered={false}>
            <Statistic
              title="Tổng Users"
              value={dataDashboard.countUser}
              formatter={formatter}
            />
          </Card>
        </Col>
        <Col span={10}>
          <Card bordered={false}>
            <Statistic
              title="Tổng đơn hàng"
              value={dataDashboard.countOrder}
              precision={2}
              formatter={formatter}
            />
          </Card>
        </Col>
      </Row>
    </>
  );
};

export default AdminPage;
