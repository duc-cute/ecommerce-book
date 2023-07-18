/** @format */

import { Button, Modal, Table } from "antd";
import Dragger from "antd/es/upload/Dragger";

import { InboxOutlined } from "@ant-design/icons";
import { message, Upload } from "antd";
const columns = [
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
];

const ModalImportUser = ({ open, setOpen }) => {
  const handleOk = () => {
    setOpen(false);
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
        console.log(info.file, info.fileList);
      }
      if (status === "done") {
        message.success(`${info.file.name} file uploaded successfully.`);
      } else if (status === "error") {
        message.error(`${info.file.name} file upload failed.`);
      }
    },
    onDrop(e) {
      console.log("Dropped files", e.dataTransfer.files);
    },
  };
  return (
    <Modal
      width={800}
      title="Import data user"
      open={open}
      onOk={handleOk}
      onCancel={() => setOpen(false)}
      okText="Import Data"
      okButtonProps={{
        disabled: true,
      }}
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
      <Table dataSource={[]} columns={columns} />;
    </Modal>
  );
};

export default ModalImportUser;
