/** @format */

import { Breadcrumb, Table, Tag } from "antd";
import { useEffect, useState } from "react";
import { getHistoryOrder } from "../../services/apiService";
import moment from "moment";
import ReactJson from "react-json-view";
import { HomeOutlined } from "@ant-design/icons";
import { Link } from "react-router-dom";

const History = () => {
  const [listOrder, setListOrder] = useState([]);
  const columns = [
    {
      title: "Số thứ tự",
      dataIndex: "index",
      render: (text, record, index) => <label>{index + 1}</label>,
    },
    {
      title: "Thời gian",
      dataIndex: "createdAt",
      render: (text, record) => (
        <label> {moment(record.createdAt).format("DD-MM-YYYY HH:MM:SS")}</label>
      ),
    },
    {
      title: "Tổng tiền",
      dataIndex: "totalPrice",
      render: (text, record) => (
        <label>
          {new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "vnd",
          }).format(record.totalPrice)}
        </label>
      ),
    },
    {
      title: "Trạng thái",
      dataIndex: "status",
      render: () => <Tag color="green">Thành công</Tag>,
    },
    {
      title: "Chi tiết",
      dataIndex: "description",

      render: (text, record) => (
        <ReactJson
          name="Chi tiết đơn hàng"
          src={record?.detail}
          collapsed
          displayObjectSize={false}
          displayDataTypes={false}
          enableClipboard={false}
        />
      ),
    },
  ];

  useEffect(() => {
    const fetchListOrder = async () => {
      const res = await getHistoryOrder();
      if (res && res.data) {
        setListOrder(res.data);
      }
    };
    fetchListOrder();
  }, []);

  const itemsBreadcrumb = [
    {
      title: (
        <Link to="/">
          <HomeOutlined />
        </Link>
      ),
    },
    {
      title: <span style={{ fontWeight: 500 }}>Lịch sử mua hàng</span>,
    },
  ];

  return (
    <>
      <div
        className="breadcrum-block"
        style={{
          margin: "24px 30px 8px 12px",

          maxWidth: "80%",
          display: "flex",
        }}
      >
        <Breadcrumb items={itemsBreadcrumb} />
      </div>
      <div className="history-page-container">
        <Table
          // title={() => <h2>Lịch sử mua hàng</h2>}
          rowKey={"_id"}
          dataSource={listOrder}
          columns={columns}
        />
        ;
      </div>
    </>
  );
};

export default History;
