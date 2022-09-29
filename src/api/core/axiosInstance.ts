import axios from "axios";
import apis from "../api";

export const arr = axios.create({baseURL: process.env.REACT_APP_BASE_URI})

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
    console.log("err",err)
    return Promise.reject(err);
  }
);

instance.interceptors.response.use(
  function (res) {
    return res;
  },
  async function (error) {
    console.log(error.response);
    const originalRequest = error.config;
    try {
      switch (error.response.data.msg) {
        case "만료된 JWT token 입니다.": {
          const requestRes = await apis.reissue();
          sessionStorage.setItem("accessToken", requestRes.authorization);

          originalRequest.headers["Authorization"] = requestRes.authorization;
          return await instance.request(originalRequest);
        }
      }
    } catch (deepError) { 
      return console.log(deepError);
    }
    return Promise.reject(error)
  }
);

export default instance;
