/** @format */

import ImageGallery from "react-image-gallery";
import { Rate, Row, Col } from "antd";
import "./book.scss";
import { FaCartPlus } from "react-icons/fa";
import { useRef, useState } from "react";
import { MinusOutlined, PlusOutlined } from "@ant-design/icons";
import ModalGallery from "./ModalGallery";
import ViewLoading from "./ViewLoading";

const ViewDetail = ({ dataBook }) => {
  const galleryRef = useRef(null);
  const [isOpenModalGallery, setIsOpenModalGallery] = useState(false);
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleOnClickImage = () => {
    setIsOpenModalGallery(true);
    setCurrentIndex(galleryRef?.current?.getCurrentIndex() ?? 0);
  };

  return (
    <div className="bookpage-container">
      {dataBook._id ? (
        <>
          <Row gutter={30} className="bookpage-wrapper">
            <Col md={10} className="bookpage-gallery">
              <ImageGallery
                ref={galleryRef}
                showFullscreenButton={false}
                showNav={false}
                items={dataBook.items}
                showPlayButton={false}
                slideOnThumbnailOver={true}
                onClick={() => handleOnClickImage()}
              />
            </Col>
            <Col md={14} className="bookpage-content">
              <div className="author">
                Tác giả :<span> {dataBook.author}</span>
              </div>
              <h1 className="name">{dataBook.mainText}</h1>
              <div className="rating">
                <Rate
                  defaultValue={5}
                  style={{ color: "#ffce3d", fontSize: 14 }}
                />
                Đã bán {dataBook.sold}
              </div>
              <div className="price">
                {new Intl.NumberFormat("vi-VI", {
                  style: "currency",
                  currency: "vnd",
                }).format(dataBook.price)}
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
          </Row>
        </>
      ) : (
        <>
          <ViewLoading />
        </>
      )}

      <ModalGallery
        open={isOpenModalGallery}
        setOpen={setIsOpenModalGallery}
        current={currentIndex}
        items={dataBook.items}
        title={"Diary Of A Wimpy Kid 09: The Long Haul"}
      />
    </div>
  );
};

export default ViewDetail;
