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

export { postRegister, postLogin, fetchAccount };
