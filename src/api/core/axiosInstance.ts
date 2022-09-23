import axios from "axios";
import apis from "../api";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
});

instance.interceptors.request.use(
  (req) => {
    const accessToken = sessionStorage.getItem("accessToken");
    if (typeof accessToken === "string" && typeof req.headers !== "undefined") {
      req.headers.authorization = accessToken;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error) {
    try {
      const originalRequest = error.config;

      const requestRes = await apis.reissue();
      sessionStorage.setItem("accessToken", requestRes.authorization);

      originalRequest.headers["Authorization"] = requestRes.authorization;

      return await instance.request(originalRequest);
    } catch (error) {
      sessionStorage.removeItem("accessToken");
      return console.log(error);
    }
  }
);

export default instance;
