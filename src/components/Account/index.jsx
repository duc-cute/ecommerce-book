/** @format */

import { Modal } from "antd";
import { Tabs } from "antd";
import ManageAccount from "./ManageAccount";
import ChangePassWord from "./ChangePassword";

const AccountModal = ({ open, setOpen }) => {
  const handleCancel = () => {
    setOpen(false);
  };

  const onChange = (key) => {
    // console.log(key);
  };

  const items = [
    {
      key: "1",
      label: "Cập nhật thông tin",
      children: <ManageAccount />,
    },
    {
      key: "2",
      label: "Đổi mật khẩu",
      children: <ChangePassWord />,
    },
  ];
  return (
    <>
      <Modal
        title="Quản lý tài khoản"
        open={open}
        footer={false}
        onCancel={handleCancel}
        width={"50%"}
      >
        <Tabs defaultActiveKey="1" items={items} onChange={onChange} />
      </Modal>
    </>
  );
};

export default AccountModal;
