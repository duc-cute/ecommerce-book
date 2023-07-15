/** @format */

import axios from "../utils/axios-customize";

const postRegister = (values) => {
  return axios.post("api/v1/user/register", {
    ...values,
  });
};

export { postRegister };
