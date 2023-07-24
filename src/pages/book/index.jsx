/** @format */

import { useLocation } from "react-router-dom";
import ImageGallery from "react-image-gallery";
import { Input, Rate, Row, Col, Skeleton } from "antd";
import "./book.scss";
import { FaCartPlus } from "react-icons/fa";
import { useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ModalGallery from "./ModalGallery";

const BookPage = () => {
  const galleryRef = useRef(null);
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);
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

  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(galleryRef?.current?.getCurrentIndex() ?? 0);
    console.log(currentIndex);
    console.log("ref", galleryRef?.current?.getCurrentIndex());
  };

  return (
    <div className="bookpage-container">
      {/* <Row gutter={30} className="bookpage-wrapper">
        <Col md={10} className="bookpage-gallery">
          <ImageGallery
            ref={galleryRef}
            showFullscreenButton={false}
            showNav={false}
            items={images}
            showPlayButton={false}
            slideOnThumbnailOver={true}
            onClick={() => handleOnClickImage()}
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
              <button>
                <MinusOutlined />
              </button>
              <input defaultValue={1} />
              <button>
                <PlusOutlined />
              </button>
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
      </Row> */}
      <Row gutter={30} className="bookpage-loading">
        <Col
          md={10}
          style={{
            display: "flex",
            alignItems: "center",
            flexDirection: "column",
            gap: "20px",
          }}
        >
          <Skeleton.Input style={{ width: "100%", height: 350 }} block active />
          <div style={{ display: "flex", gap: "20px" }}>
            <Skeleton.Image active />
            <Skeleton.Image active />
            <Skeleton.Image active />
          </div>
        </Col>
        <Col md={14}>
          <Skeleton
            active
            paragraph={{
              rows: 3,
            }}
          />
          <br />
          <br />
          <Skeleton
            active
            paragraph={{
              rows: 2,
            }}
          />
          <br />

          <div
            style={{
              display: "flex",
              alignItems: "center",
              gap: "20px",
              // overflow: "hidden",
              marginTop: "20px",
            }}
          >
            <Skeleton.Button active size="large" style={{ width: 100 }} />
            <Skeleton.Button active size="large" style={{ width: 100 }} />
          </div>
        </Col>
      </Row>
      <ModalGallery
        open={isOpenModalGallery}
        setOpen={setIsOpenModalGallery}
        current={currentIndex}
        items={images}
        title={"Diary Of A Wimpy Kid 09: The Long Haul"}
      />
    </div>
  );
};

export default BookPage;
