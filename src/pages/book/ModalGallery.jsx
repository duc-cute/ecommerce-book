/** @format */

import { Col, Image, Modal, Row } from "antd";
import { useRef, useState } from "react";
import ImageGallery from "react-image-gallery";

const ModalGallery = ({ open, setOpen, current, items, title }) => {
  const galleryRef = useRef(null);
  const [activeIndex, setActiveIndex] = useState(0);

  const handleCancel = () => {
    setOpen(false);
  };
  console.log("current", current);

  return (
    <Modal
      open={open}
      cancelText={<></>}
      okText={<></>}
      footer={<></>}
      onCancel={handleCancel}
      closeIcon={<></>}
      width={"60vw"}
    >
      <Row gutter={20} className="modal-gallery-container">
        <Col span={16}>
          <ImageGallery
            ref={galleryRef}
            showFullscreenButton={false}
            items={items}
            showThumbnails={false}
            showPlayButton={false}
            slideOnThumbnailOver={true}
            startIndex={current}
            onSlide={(i) => setActiveIndex(i)}
            slideDuration={0}
          />
        </Col>
        <Col span={8}>
          <div className="title-modal">{title}</div>
          <Row gutter={[20, 10]}>
            {items &&
              items.length > 0 &&
              items.map((item, index) => (
                <Col key={`image-${index}`} span={12}>
                  <div className="image-item">
                    <Image
                      className={activeIndex === index ? "active" : ""}
                      width={"100%"}
                      src={item.original}
                      preview={false}
                      onClick={() => galleryRef.current.slideToIndex(index)}
                    />
                  </div>
                </Col>
              ))}
          </Row>
        </Col>
      </Row>
    </Modal>
  );
};

export default ModalGallery;
