/** @format */

import { CloseOutlined } from "@ant-design/icons";
import { Drawer, Descriptions, Badge } from "antd";
import moment from "moment";
const DetailUser = ({ open, setOpen, data }) => {
  const onClose = () => {
    setOpen(false);
  };
  return (
    <Drawer
      title={<h3>Chức năng xem chi tiết</h3>}
      closeIcon={<CloseOutlined />}
      closable={true}
      onClose={onClose}
      open={open}
      size="large"
    >
      <Descriptions column={2} title="User Info" bordered>
        <Descriptions.Item label="Id">{data?._id}</Descriptions.Item>
        <Descriptions.Item label="Tên hiển thị">
          {data?.fullName}
        </Descriptions.Item>

        <Descriptions.Item label="Email">{data?.email}</Descriptions.Item>
        <Descriptions.Item label="Số điện thoại">
          {data?.phone}
        </Descriptions.Item>
        <Descriptions.Item label="Role" span={2}>
          <Badge status="processing" text={data?.role} />
        </Descriptions.Item>
        <Descriptions.Item size="middle" label="Created At">
          {moment(data?.createdAt).format("DD-MM-YYYY HH:MM:SS")}
        </Descriptions.Item>
        <Descriptions.Item size="middle" label="Updated At">
          {moment(data?.updatedAt).format("DD-MM-YYYY HH:MM:SS")}
        </Descriptions.Item>
      </Descriptions>
    </Drawer>
  );
};

export default DetailUser;
