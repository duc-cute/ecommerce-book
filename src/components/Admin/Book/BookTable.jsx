/** @format */

import { Popconfirm, Table, notification } from "antd";
import { useEffect, useState } from "react";
import { deleteBook, getBookWithPaginate } from "../../../services/apiService";
import InputSearch from "./InputSearch";
import HeaderTable from "./HeaderTable";
import moment from "moment";
import * as XLSX from "xlsx";
import {
  DeleteTwoTone,
  EditTwoTone,
  QuestionCircleOutlined,
} from "@ant-design/icons";

import ModalCreateBook from "./Modal/ModalCreateBook";
import ModalUpdateBook from "./Modal/ModalUpdateBook";
import DetailBook from "./DetailBook";

const BookTable = () => {
  const [isLoading, setIsLoading] = useState(false);
  const [current, setCurrent] = useState(1);
  const [pageSize, setPageSize] = useState(4);
  const [listBook, setListBook] = useState([]);
  const [total, setTotal] = useState(0);

  const [dataViewDetail, setDataViewDetail] = useState({});
  const [showViewDetail, setShowViewDetail] = useState(false);

  const [openModalCreate, setOpenModalCreate] = useState(false);
  const [openModalUpdate, setOpenModalUpdate] = useState(false);

  const [filter, setFilter] = useState("");
  const [sortQuery, setSortQuery] = useState("sort=-updatedAt");

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
      title: "Tên sách",
      dataIndex: "mainText",
      key: "mainText",
      sorter: true,
    },
    {
      title: "Thể loại",
      dataIndex: "category",
      key: "category",
      sorter: true,
    },
    {
      title: "Tác giả",
      dataIndex: "author",
      key: "author",
      sorter: true,
    },

    {
      title: "Giá tiền",
      dataIndex: "price",
      render: (text, record) => (
        <label>
          {new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "vnd",
          }).format(record.price)}
        </label>
      ),
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
              title="Xóa sách "
              icon={
                <QuestionCircleOutlined
                  style={{
                    color: "red",
                  }}
                />
              }
              description="Bạn chắc chắn muốn xóa sách  này ?"
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
    fetchDataBook();
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
      setSortQuery(newSortQuery);
    }
  };

  const fetchDataBook = async () => {
    let query = `current=${current}&pageSize=${pageSize}`;
    setIsLoading(true);
    if (filter) {
      query += `&${filter}`;
    }
    if (sortQuery) {
      query += `&${sortQuery}`;
    }
    const res = await getBookWithPaginate(query);
    setIsLoading(false);
    if (res && res.data) {
      setListBook(res.data.result);
      setTotal(res.data.meta.total);
    }
  };

  const refreshData = () => {
    setSortQuery("");
    setFilter("");
  };

  const handleExportData = () => {
    if (listBook.length > 0) {
      const worksheet = XLSX.utils.json_to_sheet(listBook);
      const workbook = XLSX.utils.book_new();
      XLSX.utils.book_append_sheet(workbook, worksheet, "Sheet1");
      XLSX.writeFile(workbook, "ExportUser.csv");
    }
  };

  const handleDelete = async (record) => {
    const res = await deleteBook(record._id);
    if (res && res.data) {
      notification.success({
        message: "Deleted User successfully",
        description: `Deleted  book name : ${record.mainText} `,
      });
      await fetchDataBook();
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
        <InputSearch fetchDataBook={fetchDataBook} setFilter={setFilter} />
      </div>
      <div className="admin-table-user">
        <Table
          loading={isLoading}
          onChange={onChange}
          dataSource={listBook}
          title={() => (
            <HeaderTable
              refreshData={refreshData}
              setOpenModalCreate={setOpenModalCreate}
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
      <DetailBook
        open={showViewDetail}
        setOpen={setShowViewDetail}
        data={dataViewDetail}
      />
      <ModalCreateBook
        fetchDataBook={fetchDataBook}
        setOpen={setOpenModalCreate}
        open={openModalCreate}
      />

      <ModalUpdateBook
        setOpen={setOpenModalUpdate}
        open={openModalUpdate}
        fetchDataBook={fetchDataBook}
        data={dataUpdate}
        setData={setDataUpdate}
      />
    </>
  );
};

export default BookTable;
