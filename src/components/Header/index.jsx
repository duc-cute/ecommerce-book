/** @format */

import { Avatar, Badge, Dropdown, Input, Space, message } from "antd";
import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { GiShoppingCart } from "react-icons/gi";
import { DownOutlined } from "@ant-design/icons";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postLogout } from "../../services/apiService";
import { doLogout } from "../../redux/account/accountSlice";
const Header = () => {
  const account = useSelector((state) => state.account);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const url = `${import.meta.env.VITE_BACKEND_URL}/images/avatar/${
    account.user.avatar
  }`;

  const handleLogout = async () => {
    const res = await postLogout();

    if (res && res.data) {
      message.success("Đăng xuất thành công");
      dispatch(doLogout());
      navigate("/");
    }
    console.log("res", res);
  };

  let items = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: "1",
    },
    {
      label: <label onClick={handleLogout}>Đăng xuất</label>,
      key: "2",
    },
  ];

  if (account.user.role === "ADMIN") {
    items.unshift({
      label: <Link to="/admin">Trang Quản Trị</Link>,
      key: "0",
    });
  }

  return (
    <header className="header">
      <div className="header-logo">
        <span>
          <FaReact />
        </span>
        <div>Hoi Dan IT</div>
      </div>
      <div className="header-search">
        <Input
          size="large"
          placeholder="Bạn cần tìm gì"
          prefix={<VscSearchFuzzy />}
        />
      </div>
      <div className="header-account">
        <Badge count={5} size="small">
          <span className="header-badge">
            <GiShoppingCart />
          </span>
        </Badge>
        {account?.isAuthenticated ? (
          <>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  <Avatar src={url} /> {account?.user?.fullName}
                  <DownOutlined />
                </Space>
              </a>
            </Dropdown>
          </>
        ) : (
          <span
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/login")}
          >
            Tài khoản
          </span>
        )}
      </div>
    </header>
  );
};

export default Header;
