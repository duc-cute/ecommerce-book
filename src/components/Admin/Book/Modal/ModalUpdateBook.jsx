/** @format */

import {
  Col,
  Divider,
  Form,
  Input,
  InputNumber,
  Modal,
  Row,
  Select,
  Upload,
  message,
  notification,
} from "antd";
import {
  getBookCategory,
  postCreateNewBook,
  updateBook,
  uploadImageBook,
} from "../../../../services/apiService";
import { useEffect, useState } from "react";
import { LoadingOutlined, PlusOutlined } from "@ant-design/icons";
import { v4 as uuidv4 } from "uuid";

const ModalUpdateBook = ({ open, setOpen, fetchDataBook, data, setData }) => {
  const [form] = Form.useForm();
  const [isSubmit, setIsSubmit] = useState(false);
  const [dataSelect, setDataSelect] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [isLoadingSlider, setIsLoadingSlider] = useState(false);

  const [imageUrl, setImageUrl] = useState("");
  const [previewImage, setPreviewImage] = useState(false);
  const [previewTitle, setPreviewTitle] = useState("");
  const [previewOpen, setPreviewOpen] = useState(false);

  const [dataThumbNail, setDataThumbNail] = useState([]);
  const [dataSlider, setDataSlider] = useState([]);
  const [initForm, setInitForm] = useState({});

  useEffect(() => {
    const fetchDataCategory = async () => {
      const res = await getBookCategory();
      if (res && res.data && res.data.length > 0) {
        const category = res.data.map((item) => {
          return {
            label: item,
            value: item,
          };
        });
        setDataSelect(category);
      }
    };
    fetchDataCategory();
  }, []);

  useEffect(() => {
    if (data?._id) {
      const imgThumbnail = [
        {
          uid: uuidv4(),
          name: data.thumbnail,
          status: "done",

          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${
            data.thumbnail
          }`,
        },
      ];
      const arrSlider = data.slider.map((item) => {
        return {
          uid: uuidv4(),
          name: item,
          status: "done",

          url: `${import.meta.env.VITE_BACKEND_URL}/images/book/${item}`,
        };
      });

      const init = {
        author: data.author,
        category: data.category,
        mainText: data.mainText,
        sold: data.sold,
        price: data.price,
        quantity: data.quantity,
        _id: data._id,
        slider: { fileList: arrSlider },
        thumbnail: { fileList: imgThumbnail },
      };
      setInitForm(init);
      setDataThumbNail(imgThumbnail);
      setDataSlider(arrSlider);
      form.setFieldsValue(data);
    }

    return () => {
      form.resetFields();
    };
  }, [data]);

  const handleUploadFileThumbNail = async ({ file, onSuccess, onError }) => {
    const res = await uploadImageBook(file);
    if (res && res.data) {
      setDataThumbNail([
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("error");
    }
  };

  const handleUploadFileSlider = async ({ file, onSuccess, onError }) => {
    const res = await uploadImageBook(file);
    if (res && res.data) {
      setDataSlider((dataSlider) => [
        ...dataSlider,
        {
          name: res.data.fileUploaded,
          uid: file.uid,
        },
      ]);
      onSuccess("ok");
    } else {
      onError("error");
    }
  };

  const getBase64 = (img, callback) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => callback(reader.result));
    reader.readAsDataURL(img);
  };

  const handlePreview = async (file) => {
    if (file.url && !file.originFileObj) {
      setPreviewImage(file.url);
      setPreviewOpen(true);
      setPreviewTitle(file.name);
      return;
    }
    getBase64(file.originFileObj, (url) => {
      setPreviewImage(url);
      setPreviewOpen(true);
      setPreviewTitle(
        file.name || file.url.substring(file.url.lastIndexOf("/") + 1)
      );
    });
  };

  const handleChange = (info, type) => {
    if (info.file.status === "uploading") {
      type ? setIsLoadingSlider(true) : setIsLoading(true);
      return;
    }
    if (info.file.status === "done") {
      getBase64(info.file.originFileObj, (url) => {
        type ? setIsLoadingSlider(false) : setIsLoading(false);
        setImageUrl(url);
      });
    }
  };

  const onFinish = async ({
    author,
    category,
    mainText,
    price,
    quantity,
    sold,
    _id,
  }) => {
    if (dataThumbNail.length === 0) {
      notification.error({
        message: "Bạn chưa chọn ThumbNail",
        description: res.message,
      });
      return;
    }
    if (dataSlider.length === 0) {
      notification.error({
        message: "Bạn chưa chọn Slider",
        description: res.message,
      });
      return;
    }
    let thumbnail = dataThumbNail[0].name;
    let slider = dataSlider.map((item) => item.name);

    const values = {
      author,
      category,
      mainText,
      price,
      quantity,
      sold,
      thumbnail,
      slider,
    };

    setIsSubmit(true);
    const res = await updateBook(values, _id);

    if (res && res.data) {
      message.success("Thêm mới sách thành công");
      setOpen(false);
      form.resetFields();
      setDataSlider([]);
      setDataThumbNail([]);
      await fetchDataBook();
    } else {
      notification.error({
        message: "Đã có lỗi xảy ra",
        description: res.message,
      });
    }
    setIsSubmit(false);
  };

  const beforeUpload = (file) => {
    const isJpgOrPng = file.type === "image/jpeg" || file.type === "image/png";
    if (!isJpgOrPng) {
      message.error("You can only upload JPG/PNG file!");
    }
    const isLt2M = file.size / 1024 / 1024 < 2;
    if (!isLt2M) {
      message.error("Image must smaller than 2MB!");
    }
    return isJpgOrPng && isLt2M;
  };

  const handleRomoveFile = (file, type) => {
    if (type === "thumbnail") {
      setDataThumbNail([]);
    }
    if (type === "slider") {
      const newData = dataSlider.filter((item) => item.uid !== file.uid);
      setDataSlider(newData);
    }
  };

  const handleChangeSelect = () => {};
  return (
    <>
      <Modal
        title=<label>Update Book</label>
        open={open}
        onOk={() => form.submit()}
        okText="Cập nhật"
        cancelText="Hủy"
        forceRender
        onCancel={() => {
          setOpen(false);
          setInitForm(null);
          setData(null);
        }}
        confirmLoading={isSubmit}
        width={"60vw"}
      >
        <Divider />
        <Form
          form={form}
          name="basic"
          onFinish={onFinish}
          autoComplete="off"
          className="ModalUpdateBook-form"
          size="large"
        >
          <Row gutter={15}>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tên sách"
                name="mainText"
                rules={[
                  { required: true, message: "Please input your name book!" },
                ]}
              >
                <Input />
              </Form.Item>
              <Form.Item
                hidden
                labelCol={{ span: 24 }}
                label="ID"
                name="_id"
                rules={[
                  { required: true, message: "Please input your name book!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Tác giả"
                name="author"
                rules={[
                  { required: true, message: "Please input your author!" },
                ]}
              >
                <Input />
              </Form.Item>
            </Col>

            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Giá tiền"
                name="price"
                rules={[
                  { required: true, message: "Please input your email!" },
                ]}
              >
                <InputNumber
                  min={1}
                  addonAfter={"VND"}
                  style={{ width: "100%" }}
                  formatter={(value) =>
                    `${value}`.replace(/(\d)(?=(\d{3})+(?!\d))/g, "$1,")
                  }
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Thể loại"
                name="category"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <Select
                  showSearch
                  allowClear
                  options={dataSelect}
                  onChange={handleChangeSelect}
                />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Số lượng"
                name="quantity"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={6}>
              <Form.Item
                labelCol={{ span: 24 }}
                initialValue={0}
                label="Đã bán"
                name="sold"
                rules={[
                  {
                    required: true,
                    message: "Please input your phone number!",
                  },
                ]}
              >
                <InputNumber min={0} style={{ width: "100%" }} />
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Thumbnail"
                name="thumbnail"
                // valuePropName="fileList"
              >
                <Upload
                  name="thumbnail"
                  maxCount={1}
                  multiple={false}
                  beforeUpload={beforeUpload}
                  listType="picture-card"
                  onChange={handleChange}
                  customRequest={handleUploadFileThumbNail}
                  onPreview={handlePreview}
                  defaultFileList={initForm?.thumbnail?.fileList ?? []}
                  onRemove={(file) => handleRomoveFile(file, "thumbnail")}
                >
                  <div>
                    {isLoading ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: "8px" }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
            <Col span={12}>
              <Form.Item
                labelCol={{ span: 24 }}
                label="Ảnh Slider"
                name="slider"
              >
                <Upload
                  name="slider"
                  beforeUpload={beforeUpload}
                  multiple
                  listType="picture-card"
                  onChange={(info) => handleChange(info, "slider")}
                  customRequest={handleUploadFileSlider}
                  onPreview={handlePreview}
                  onRemove={(file) => handleRomoveFile(file, "slider")}
                  defaultFileList={initForm?.slider?.fileList ?? []}
                >
                  <div>
                    {isLoadingSlider ? <LoadingOutlined /> : <PlusOutlined />}
                    <div style={{ marginTop: "8px" }}>Upload</div>
                  </div>
                </Upload>
              </Form.Item>
            </Col>
          </Row>
        </Form>
      </Modal>
      <Modal
        open={previewOpen}
        title={previewTitle}
        footer={null}
        onCancel={() => setPreviewOpen(false)}
      >
        <img
          alt="example"
          style={{
            width: "100%",
          }}
          src={previewImage}
        />
      </Modal>
    </>
  );
};

export default ModalUpdateBook;
