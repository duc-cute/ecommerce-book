/** @format */

import { Button, Space, Table } from "antd";
import { useEffect, useState } from "react";
import { getUserWithPaginate } from "../../../services/apiService";
import { TiPlus } from "react-icons/ti";

import { CgImport } from "react-icons/cg";
import { AiOutlineCloudUpload, AiOutlineReload } from "react-icons/ai";
const columns = [
  {
    title: "ID",
    dataIndex: "_id",
    key: "_id",
  },
  {
    title: "Tên hiển thị",
    dataIndex: "fullName",
    key: "fullName",
  },
  {
    title: "Email",
    dataIndex: "email",
    key: "email",
  },
  {
    title: "Số điện thoại",
    dataIndex: "phone",
    key: "phone",
  },
  {
    title: "Action",
    key: "action",
    render: () => <button>delete</button>,
  },
];

const HeaderTable = () => {
  return (
    <>
      <div className="table-header">
        <span className="table-title">Table List Users</span>
        <div className="table-actions-group">
          <Button type="primary" icon={<AiOutlineCloudUpload />}>
            Export
          </Button>
          <Button type="primary" icon={<CgImport />}>
            Import
          </Button>
          <Button type="primary" icon={<TiPlus />}>
            Thêm mới
          </Button>
          <div className="btn-reload">
            <AiOutlineReload />
          </div>
        </div>
      </div>
    </>
  );
};
const UserTable = () => {
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [listUser, setListUser] = useState([]);
  const [total, setTotal] = useState(0);

  useEffect(() => {
    fetchDataUser();
  }, [current, pageSize]);

  const onChange = (paginate) => {
    if (+paginate.current !== current) {
      setCurrent(paginate.current);
    }
    if (+paginate.pageSize !== pageSize) {
      setPageSize(paginate.pageSize);
      setCurrent(1);
    }
  };

  const fetchDataUser = async () => {
    const res = await getUserWithPaginate(current, pageSize);
    if (res && res.data) {
      console.log("res", res.data);

      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  return (
    <>
      <Table
        onChange={onChange}
        dataSource={listUser}
        title={() => <HeaderTable />}
        rowKey={"_id"}
        columns={columns}
        pagination={{
          current: current,
          pageSize: pageSize,
          showSizeChanger: true,
          pageSizeOptions: ["4", "6", "8", "12"],
          total: total,
        }}
      />
    </>
  );
};

export default UserTable;
