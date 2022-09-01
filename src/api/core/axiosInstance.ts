import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
});

instance.interceptors.request.use((req) => {
  const accessToken = localStorage.getItem("accessToken");
  if (typeof accessToken === "string" && typeof req.headers !== "undefined") {
    req.headers.authorization = accessToken;
  }
});

export default instance;
