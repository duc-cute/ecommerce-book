/** @format */

import { Avatar, Badge, Dropdown, Input, Popover, Space, message } from "antd";
import { FaReact } from "react-icons/fa";
import { VscSearchFuzzy } from "react-icons/vsc";
import { GiShoppingCart } from "react-icons/gi";
import { AiOutlineMenu } from "react-icons/ai";
import { DownOutlined } from "@ant-design/icons";
import "./header.scss";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { postLogout } from "../../services/apiService";
import { doLogoutAction } from "../../redux/account/accountSlice";
import { useState } from "react";
import AccountModal from "../Account";
const Header = ({ setQueryHeader, setShowSideBar }) => {
  const [openAcc, setOpenAcc] = useState(false);
  const [visiblePopover, setVisiblePopover] = useState(false);
  const account = useSelector((state) => state.account);
  const { carts } = useSelector((state) => state.cart);
  const navigate = useNavigate();
  const dispatch = useDispatch();

  const URL_BACKEND = import.meta.env.VITE_BACKEND_URL;
  const url = `${URL_BACKEND}/images/avatar/${account.user.avatar}`;

  const URL_THUMNAIL = `${URL_BACKEND}/images/book/`;

  const contentPopover = () => {
    return (
      <div className="wrapper">
        <ul className="content">
          {carts.length === 0 ? (
            <li>Chưa có sản phẩm nào cả</li>
          ) : (
            <>
              {carts.map((item, index) => (
                <li key={`popover-${index}`} className="item ">
                  <div className="img">
                    <img src={`${URL_THUMNAIL}${item.detail.thumbnail}`} />
                  </div>
                  <div className="name line-clamp">
                    <p>{item.detail.mainText}</p>
                  </div>
                  <div className="price">
                    <span>
                      {new Intl.NumberFormat("vi-VI", {
                        style: "currency",
                        currency: "vnd",
                      }).format(item.detail.price)}
                    </span>
                  </div>
                </li>
              ))}
            </>
          )}
        </ul>
        <button
          className="detail-cart"
          onClick={() => {
            setVisiblePopover(false);
            navigate("/order");
          }}
        >
          Xem giỏ hàng
        </button>
      </div>
    );
  };

  const handleLogout = async () => {
    const res = await postLogout();

    if (res && res.data) {
      message.success("Đăng xuất thành công");
      dispatch(doLogoutAction());
      navigate("/");
    }
  };

  let items = [
    {
      label: <label onClick={() => setOpenAcc(true)}>Quản lý tài khoản</label>,
      key: "1",
    },
    {
      label: <Link to="/history">Lịch sử mua hàng</Link>,
      key: "3",
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

  const hanleOnchange = (value) => {
    setQueryHeader(value);
  };

  return (
    <>
      <header className="header">
        <div className="header-logo" onClick={() => navigate("/")}>
          <span>
            <FaReact />
          </span>
          <div>Book Dev</div>
        </div>
        <div className="header-menu-mobile">
          <span onClick={() => setShowSideBar(true)}>
            <AiOutlineMenu />
          </span>
        </div>
        <div className="header-search">
          <Input
            size="large"
            placeholder="Bạn cần tìm gì"
            prefix={<VscSearchFuzzy />}
            onChange={(e) => hanleOnchange(e.target.value)}
          />
        </div>
        <div className="header-account">
          <Popover
            placement="bottomRight"
            title="Sản phẩm mới thêm"
            content={contentPopover}
            trigger="click"
            open={visiblePopover}
            rootClassName="popover-badge"
            onOpenChange={(newOpen) => setVisiblePopover(newOpen)}
            showArrow={true}
            className="header-cart"
          >
            <div>
              <Badge
                showZero
                count={carts && carts.length > 0 ? carts.length : 0}
                size="small"
              >
                <span className="header-badge">
                  <GiShoppingCart />
                </span>
              </Badge>
            </div>
          </Popover>
          <div className="header-account-user">
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
        </div>
      </header>
      <AccountModal open={openAcc} setOpen={setOpenAcc} />
    </>
  );
};

export default Header;
