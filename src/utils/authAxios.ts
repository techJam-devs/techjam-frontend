/**
 * @description Create an axios instance for login, sign up, reset password, forget password
 */

import axios from "axios";

const authAxios = axios.create({
  baseURL: import.meta.env.VITE_AUTH_API_URL,
  // withCredentials: true,
});

export default authAxios;
