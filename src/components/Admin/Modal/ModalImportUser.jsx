/** @format */

import { Button, Modal, Table } from "antd";
import Dragger from "antd/es/upload/Dragger";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
import * as XLSX from "xlsx";
import { useState } from "react";

const ModalImportUser = ({ open, setOpen }) => {
  const [dataImport, setDataImport] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isDisable, setIsDisable] = useState(true);

  const handleOk = () => {
    setOpen(false);
    setDataImport([]);
  };

  const dummyRequest = ({ file, onSuccess }) => {
    setTimeout(() => {
      onSuccess("ok");
    }, 1000);
  };

  const props = {
    name: "file",
    multiple: false,
    maxCount: 1,
    accept:
      ".csv,aplication/vnd.ms-excel,application/vnd.openxmlformats-officedocument.spreadsheetml.sheet",
    // action: "https://www.mocky.io/v2/5cc8019d300000980a055e76",
    customRequest: dummyRequest,
    onChange(info) {
      const { status } = info.file;
      if (status !== "uploading") {
        console.log("file", info.file);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
        handleUpload(info.file.originFileObj);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };

  const handleUpload = (f) => {
    setIsLoading(true);
    let reader = new FileReader();
    reader.onload = function (e) {
      let data = new Uint8Array(e.target.result);
      let readedData = XLSX.read(data, { type: "array" });
      const ws = readedData.Sheets["Sheet1"];

      const dataParse = XLSX.utils.sheet_to_json(ws);
      // const dataParse = XLSX.utils.sheet_to_json(ws, {
      //   headers: ["fullName","email","phone"], Fomat data
      //   range:1
      // });
      if (dataParse) {
        setDataImport(dataParse);
        setIsDisable(false);
        console.log("dataP", dataParse);
      }
    };
    reader.readAsArrayBuffer(f);
    setIsLoading(false);
  };
  return (
    <Modal
      width={800}
      title="Import data user"
      open={open}
      onOk={handleOk}
      onCancel={() => {
        setOpen(false);
        setDataImport([]);
      }}
      okText="Import Data"
      okButtonProps={{
        disabled: isDisable,
      }}
      style={{ top: 40 }}
    >
      <Dragger {...props}>
        <p className="ant-upload-drag-icon">
          <InboxOutlined />
        </p>
        <p className="ant-upload-text">
          Click or drag file to this area to upload
        </p>
        <p className="ant-upload-hint">
          Support for a single upload. Only accept .csv, .xls, .xlsx
        </p>
      </Dragger>
      <p style={{ margin: "48px 0 12px 6px" }}>Dữ liệu upload:</p>
      <Table
        sticky
        rowKey={"Email"}
        dataSource={dataImport}
        style={{ maxHeight: "280px", overflow: "auto" }}
        loading={isLoading}
        columns={[
          {
            title: "Tên hiển thị",
            dataIndex: "Tên hiển thị",
          },
          {
            title: "Email",
            dataIndex: "Email",
          },
          {
            title: "Số điện thoại",
            dataIndex: "Số điện thoại",
          },
        ]}
      />
    </Modal>
  );
};

export default ModalImportUser;
