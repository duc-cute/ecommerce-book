/** @format */

import { CloseOutlined } from "@ant-design/icons";
import { Drawer, Descriptions, Badge, Upload, Modal, Divider } from "antd";
import moment from "moment";
import { useEffect, useState } from "react";
import { v4 as uuidv4 } from "uuid";

const DetailBook = ({ open, setOpen, data }) => {
  const [previewOpen, setPreviewOpen] = useState(false);
  const [previewImage, setPreviewImage] = useState("");
  const [previewTitle, setPreviewTitle] = useState("");
  const [fileList, setFileList] = useState([]);

  useEffect(() => {
    let imgThumbnail = {},
      imgSlider = [];
    if (data) {
      if (data.thumbnail) {
        imgThumbnail = {
          uid: uuidv4(),
          name: data.thumbnail,
          status: "done",

          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            data.thumbnail
          }`,
        };
      }
      if (data.slider && data.slider.length > 0) {
        imgSlider = data.slider.map((item) => {
          return {
            uid: uuidv4(),
            name: item,
            status: "done",

            url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
          };
        });
      }

      setFileList([imgThumbnail, ...imgSlider]);
    }
  }, [data]);

  const handleCancel = () => setPreviewOpen(false);

  const handlePreview = async (file) => {
    setPreviewImage(file.url);
    setPreviewOpen(true);
    setPreviewTitle(file.name);
  };
  const handleChange = ({ fileList: newFileList }) => {
    setFileList(newFileList);
  };

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

        <Descriptions.Item label="Tên sách">{data?.mainText}</Descriptions.Item>
        <Descriptions.Item label="Tác giả ">{data?.author}</Descriptions.Item>
        <Descriptions.Item label="Giá tiền ">
          {new Intl.NumberFormat("vi-VI", {
            style: "currency",
            currency: "vnd",
          }).format(data?.price)}
        </Descriptions.Item>
        <Descriptions.Item label="Thể loại" span={2}>
          <Badge status="processing" text={data?.category} />
        </Descriptions.Item>
        <Descriptions.Item size="middle" label="Created At">
          {moment(data?.createdAt).format("DD-MM-YYYY HH:MM:SS")}
        </Descriptions.Item>
        <Descriptions.Item size="middle" label="Updated At">
          {moment(data?.updatedAt).format("DD-MM-YYYY HH:MM:SS")}
        </Descriptions.Item>
      </Descriptions>
      <Divider orientation="left">Ảnh Book</Divider>
      <Upload
        action="https://www.mocky.io/v2/5cc8019d300000980a055e76"
        listType="picture-card"
        fileList={fileList}
        onPreview={handlePreview}
        onChange={handleChange}
        showUploadList={{
          showRemoveIcon: false,
        }}
      ></Upload>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={handleCancel}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </Drawer>
  );
};

export default DetailBook;
