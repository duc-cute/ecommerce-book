/** @format */

import axios from "../utils/axios-customize";

// Auth Module
const postRegister = (values) => {
  return axios.post("api/v1/user/register", {
    ...values,
  });
};

const postLogin = (values) => {
  return axios.post("api/v1/auth/login", {
    ...values,
  });
};

const fetchAccount = () => {
  return axios.get("api/v1/auth/account");
};

const postLogout = () => {
  return axios.post("api/v1/auth/logout");
};

//Users

const getUserWithPaginate = (query) => {
  return axios.get(`api/v1/user?${query}`);
};

const postCreateUser = (values) => {
  return axios.post("api/v1/user", {
    ...values,
  });
};

const postCreateBulkUser = (data) => {
  return axios.post("api/v1/user/bulk-create", data);
};

const deleteUser = (id) => {
  return axios.delete(`api/v1/user/${id}`);
};

const updateUser = (_id, fullName, phone) => {
  return axios.put("api/v1/user", {
    _id,
    fullName,
    phone,
  });
};

// Books
const getBookWithPaginate = (query) => {
  return axios.get(`api/v1/book?${query}`);
};

// api/v1/book?current=1&pageSize=10

const postCreateBook = (values) => {
  return axios.post("api/v1/book", {
    ...values,
  });
};

const deleteBook = (id) => {
  return axios.delete(`api/v1/user/${id}`);
};

const updateBook = (
  thumbnail,
  slider,
  mainText,
  author,
  price,
  sold,
  quantity,
  category
) => {
  return axios.put("api/v1/book", {
    thumbnail,
    slider,
    mainText,
    author,
    price,
    sold,
    quantity,
    category,
  });
};

const getBookCategory = () => {
  return axios.get("api/v1/database/category");
};

const uploadImageBook = (fileImg) => {
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  return axios({
    method: "post",
    url: "api/v1/file/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "book",
    },
  });
};

const postCreateNewBook = (values) => {
  return axios.post("api/v1/book", {
    ...values,
  });
};

export {
  postRegister,
  postLogin,
  fetchAccount,
  postLogout,
  getUserWithPaginate,
  postCreateUser,
  postCreateBulkUser,
  deleteUser,
  updateUser,
  getBookWithPaginate,
  postCreateBook,
  deleteBook,
  updateBook,
  getBookCategory,
  uploadImageBook,
  postCreateNewBook,
};
