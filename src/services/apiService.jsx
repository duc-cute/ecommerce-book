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

const getUserWithPaginate = (current, pageSize) => {
  return axios.get(`api/v1/user?current=${current}&pageSize=${pageSize}`);
};

export {
  postRegister,
  postLogin,
  fetchAccount,
  postLogout,
  getUserWithPaginate,
};
