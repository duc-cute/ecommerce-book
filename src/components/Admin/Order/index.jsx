/** @format */

import { Table, notification } from "antd";
import { useEffect, useState } from "react";
import {
  getOrderWithPaginate,
  getUserWithPaginate,
} from "../../../services/apiService";
import moment from "moment";

import { AiOutlineReload } from "react-icons/ai";

const OrderTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [listUser, setListUser] = useState([]);
  const [total, setTotal] = useState(0);

  const [sortQuery, setSortQuery] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return <a href="#">{record._id}</a>;
      },
    },
    {
      title: "Price",
      dataIndex: "totalPrice",
      render: (text, record) => (
        <label>
          {new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "vnd",
          }).format(record.totalPrice)}
        </label>
      ),
      sorter: true,
    },
    {
      title: "Name",
      dataIndex: "name",
      sorter: true,
    },
    {
      title: "Address",
      dataIndex: "address",
      sorter: true,
    },
    {
      title: "Số điện thoại",
      dataIndex: "phone",
      key: "phone",
      sorter: true,
    },
    {
      title: "Ngày cập nhật",
      dataIndex: "updatedAt",
      render: (text, record) => (
        <label> {moment(record.updatedAt).format("DD-MM-YYYY HH:MM:SS")}</label>
      ),
      sorter: true,
    },
  ];

  useEffect(() => {
    fetchDataOrder();
  }, [current, pageSize, sortQuery]);

  const onChange = (paginate, filters, sort, extra) => {
    if (+paginate.current !== current) {
      setCurrent(paginate.current);
    }
    if (+paginate.pageSize !== pageSize) {
      setPageSize(paginate.pageSize);
      setCurrent(1);
    }
    if (sort && sort.field) {
      const newSortQuery =
        sort.order === "ascend" ? `sort=${sort.field}` : `sort=-${sort.field}`;
      setSortQuery(newSortQuery, sort);
    }
  };

  const fetchDataOrder = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    setIsLoading(true);

    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await getOrderWithPaginate(query);
    if (res && res.data) {
      setIsLoading(false);

      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const HeaderTable = () => {
    <div className="table-header">
      <span className="table-title">Table List Users</span>
      <div className="table-actions-group">
        <div
          className="btn-reload"
          onClick={() => {
            setSortQuery("");
            setFilter("");
          }}
        >
          <AiOutlineReload />
        </div>
      </div>
    </div>;
  };
  return (
    <>
      <div className="admin-table-order">
        <Table
          loading={isLoading}
          onChange={onChange}
          dataSource={listUser}
          title={() => <HeaderTable />}
          rowKey={"_id"}
          columns={columns}
          sticky={true}
          pagination={{
            current: current,
            pageSize: pageSize,
            showSizeChanger: true,
            pageSizeOptions: ["4", "6", "8", "12"],
            total: total,
            showTotal: (total, range) => {
              return (
                <div>
                  {range[0]}-{range[1]} / {total} rows
                </div>
              );
            },
          }}
        />
      </div>
    </>
  );
};

export default OrderTable;
