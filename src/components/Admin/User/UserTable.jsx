/** @format */

import { Table } from "antd";
import { useEffect, useState } from "react";
import { getUserWithPaginate } from "../../../services/apiService";
import InputSearch from "./InputSearch";
import HeaderTable from "./HeaderTable";
import DetailUser from "./DetailUser";
import moment from "moment";
import ModalCreateUser from "../Modal/ModalCreateUser";
import ModalImportUser from "../Modal/ModalImportUser";

const UserTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [listUser, setListUser] = useState([]);
  const [total, setTotal] = useState(0);

  const [dataViewDetail, setDataViewDetail] = useState({});
  const [showViewDetail, setShowViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  const columns = [
    {
      title: "ID",
      dataIndex: "_id",
      render: (text, record, index) => {
        return (
          <a
            href="#"
            onClick={() => {
              setShowViewDetail(true);
              setDataViewDetail(record);
            }}
          >
            {record._id}
          </a>
        );
      },
    },
    {
      title: "Tên hiển thị",
      dataIndex: "fullName",
      key: "fullName",
      sorter: true,
    },
    {
      title: "Email",
      dataIndex: "email",
      key: "email",
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
      dataIndex: "createdAt",
      render: (text, record) => (
        <label> {moment(record.createdAt).format("DD-MM-YYYY HH:MM:SS")}</label>
      ),
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: () => <button>delete</button>,
    },
  ];

  useEffect(() => {
    fetchDataUser();
  }, [current, pageSize, filter, sortQuery]);

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

  const fetchDataUser = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    setIsLoading(true);
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await getUserWithPaginate(query);
    if (res && res.data) {
      setIsLoading(false);
      setListUser(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const refreshData = () => {
    setSortQuery("");
    setFilter("");
  };

  return (
    <>
      <div className="admin-input-search">
        <InputSearch fetchDataUser={fetchDataUser} setFilter={setFilter} />
      </div>
      <div className="admin-table-user">
        <Table
          loading={isLoading}
          onChange={onChange}
          dataSource={listUser}
          title={() => (
            <HeaderTable
              refreshData={refreshData}
              setOpenModalCreate={setOpenModalCreate}
              setOpenModalImport={setOpenModalImport}
              listUser={listUser}
            />
          )}
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
                  {range[0]}-{range[1]} of {total} items
                </div>
              );
            },
          }}
        />
      </div>
      <DetailUser
        open={showViewDetail}
        setOpen={setShowViewDetail}
        data={dataViewDetail}
      />
      <ModalCreateUser
        fetchDataUser={fetchDataUser}
        setOpen={setOpenModalCreate}
        open={openModalCreate}
      />
      <ModalImportUser
        setOpen={setOpenModalImport}
        open={openModalImport}
        fetchDataUser={fetchDataUser}
      />
    </>
  );
};

export default UserTable;
