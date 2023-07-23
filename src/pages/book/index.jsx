/** @format */

import { useLocation } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Input, Rate, Row, Col } from "antd";
import "./book.scss";
import { FaCartPlus } from "react-icons/fa";

const BookPage = () => {
  const images = [
    {
      original: "https://picsum.photos/id/1018/1000/600/",
      thumbnail: "https://picsum.photos/id/1018/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
    {
      original: "https://picsum.photos/id/1019/1000/600/",
      thumbnail: "https://picsum.photos/id/1019/250/150/",
    },
    {
      original: "https://picsum.photos/id/1015/1000/600/",
      thumbnail: "https://picsum.photos/id/1015/250/150/",
    },
  ];
  let location = useLocation();
  let params = new URLSearchParams(location.search);
  const id = params?.get("id");
  const onMouseOverEvent = (e) => {
    console.log(e);
  };
  return (
    <div className="bookpage-container">
      <Row gutter={30} className="bookpage-wrapper">
        <Col md={10} className="bookpage-gallery">
          <ImageGallery
            showFullscreenButton={false}
            showNav={false}
            items={images}
            showPlayButton={false}
            onMouseOver={(e) => onMouseOverEvent(e)}
          />
        </Col>
        <Col md={14} className="bookpage-content">
          <div className="author">
            Tác giả :<span> Harry hury</span>
          </div>
          <h1 className="name">Diary Of A Wimpy Kid 09: The Long Haul</h1>
          <div className="rating">
            <Rate defaultValue={5} style={{ color: "#ffce3d", fontSize: 14 }} />
            Đã bán 10
          </div>
          <div className="price">
            {new Intl.NumberFormat("vi-VI", {
              style: "currency",
              currency: "vnd",
            }).format(467222)}
          </div>
          <div className="ship">
            Vận chuyển <span>Miễn phí vận chuyển</span>
          </div>
          <div className="quantity">
            Số lượng
            <div className="btn-quantity">
              <button>-</button>
              <input value={1} type="text" className="quantity-product" />

              <button>+</button>
            </div>
          </div>
          <div className="btn-shop">
            <div className="cart">
              <FaCartPlus />
              Thêm vào giỏ hàng
            </div>
            <div className="shopping-now">Mua ngay</div>
          </div>
        </Col>
      </Row>
    </div>
  );
};

export default BookPage;
