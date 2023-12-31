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

const deleteBook = (id) => {
  return axios.delete(`api/v1/book/${id}`);
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

const updateBook = (values, id) => {
  return axios.put(`api/v1/book/${id}`, {
    ...values,
  });
};

const getBookDetail = (id) => {
  return axios.get(`api/v1/book/${id}`);
};

//Order
const postNewOrder = (data) => {
  return axios.post("api/v1/order", {
    ...data,
  });
};

const getHistoryOrder = () => {
  return axios.get("api/v1/history");
};

const getOrderWithPaginate = (query) => {
  return axios.get(`api/v1/order?${query}`);
};

const getDashBoard = () => {
  return axios.get("api/v1/database/dashboard");
};

//Account
const updateInfoUser = (fullName, avatar, phone, _id) => {
  return axios.put("api/v1/user", {
    fullName,
    avatar,
    phone,
    _id,
  });
};

const uploadAvatar = (fileImg) => {
  const formData = new FormData();
  formData.append("fileImg", fileImg);
  return axios({
    method: "POST",
    url: "api/v1/file/upload",
    data: formData,
    headers: {
      "Content-Type": "multipart/form-data",
      "upload-type": "avatar",
    },
  });
};

const changePassword = (email, oldpass, newpass) => {
  return axios.post("api/v1/user/change-password", {
    email,
    oldpass,
    newpass,
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
  deleteBook,
  getBookCategory,
  uploadImageBook,
  postCreateNewBook,
  updateBook,
  getBookDetail,
  postNewOrder,
  getHistoryOrder,
  updateInfoUser,
  uploadAvatar,
  changePassword,
  getDashBoard,
  getOrderWithPaginate,
};
