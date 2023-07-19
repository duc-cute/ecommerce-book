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

export {
  postRegister,
  postLogin,
  fetchAccount,
  postLogout,
  getUserWithPaginate,
  postCreateUser,
  postCreateBulkUser,
};
