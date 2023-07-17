/** @format */

import { Badge, Dropdown, Input, Space, message } from "antd";
import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { GiShoppingCart } from "react-icons/gi";
import { DownOutlined } from "@ant-design/icons";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import { postLogout } from "../../services/apiService";
import { doLogout } from "../../redux/account/accountSlice";
const Header = () => {
  const isAuthenticated = useSelector((state) => state.account.isAuthenticated);
  const userName = useSelector((state) => state.account.user.fullName);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const handleLogout = async () => {
    const res = await postLogout();

    if (res && res.data) {
      message.success("Đăng xuất thành công");
      dispatch(doLogout());
      navigate("/");
    }
    console.log("res", res);
  };

  const items = [
    {
      label: <label>Quản lý tài khoản</label>,
      key: "0",
    },
    {
      label: <label onClick={handleLogout}>Đăng xuất</label>,
      key: "1",
    },
  ];

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
        {isAuthenticated ? (
          <>
            <Dropdown
              menu={{
                items,
              }}
              trigger={["click"]}
            >
              <a onClick={(e) => e.preventDefault()}>
                <Space>
                  Welcome {userName}
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
