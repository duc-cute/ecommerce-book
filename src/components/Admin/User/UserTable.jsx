/** @format */

import { Popconfirm, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { deleteUser, getUserWithPaginate } from "../../../services/apiService";
import InputSearch from "./InputSearch";
import HeaderTable from "./HeaderTable";
import DetailUser from "./DetailUser";
import moment from "moment";
import * as XLSX from "xlsx";
import {
  DeleteTwoTone,
  EditTwoTone,
  QuestionCircleOutlined,
} from "@ant-design/icons";
import ModalUpdateUser from "./Modal/ModalUpdateUser";
import ModalCreateUser from "./Modal/ModalCreateUser";
import ModalImportUser from "./Modal/ModalImportUser";

const UserTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [listUser, setListUser] = useState([]);
  const [total, setTotal] = useState(0);

  const [dataViewDetail, setDataViewDetail] = useState({});
  const [showViewDetail, setShowViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);
  const [openModalImport, setOpenModalImport] = useState(false);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("");

  const [dataUpdate, setDataUpdate] = useState({});

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
      dataIndex: "updatedAt",
      render: (text, record) => (
        <label> {moment(record.updatedAt).format("DD-MM-YYYY HH:MM:SS")}</label>
      ),
      sorter: true,
    },
    {
      title: "Action",
      key: "action",
      render: (text, record) => {
        return (
          <div style={{ display: "flex", alignItems: "center", gap: "12px" }}>
            <Popconfirm
              placement="topLeft"
              title="Xóa người dùng"
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              description="Bạn chắc chắn muốn xóa người dùng này ?"
              onConfirm={() => handleDelete(record)}
            >
              <DeleteTwoTone
                style={{ fontSize: "18px" }}
                twoToneColor="#ff4d4f"
              />
            </Popconfirm>
            <EditTwoTone
              style={{ fontSize: "18px", cursor: "pointer" }}
              onClick={() => {
                setOpenModalUpdate(true);
                setDataUpdate(record);
              }}
            />
          </div>
        );
      },
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

  const handleExportData = () => {
    if (listUser.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listUser);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
  };

  const handleDelete = async (record) => {
    const res = await deleteUser(record._id);
    console.log("res", res);
    if (res && res.data) {
      notification.success({
        message: "Deleted User successfully",
        description: `Deleted  user name : ${record.fullName} `,
      });
      await fetchDataUser();
    } else {
      notification.error({
        message: "Có lỗi xảy ra",
        description: `${res.message}`,
      });
    }
  };

  return (
    <>
      <div className="admin-input-search">
        <InputSearch
          fetchDataUser={fetchDataUser}
          setFilter={setFilter}
          setCurrent={setCurrent}
        />
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
              handleExportData={handleExportData}
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
                  {range[0]}-{range[1]} / {total} rows
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
      <ModalUpdateUser
        setOpen={setOpenModalUpdate}
        open={openModalUpdate}
        fetchDataUser={fetchDataUser}
        data={dataUpdate}
        setData={setDataUpdate}
      />
    </>
  );
};

export default UserTable;
