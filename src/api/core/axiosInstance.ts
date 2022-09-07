import axios from "axios";

const instance = axios.create({
  baseURL: process.env.REACT_APP_BASE_URI,
});

instance.interceptors.request.use(
  (req) => {
    const accessToken =
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJzdWIiOiJkbmZkdWZkbEBuYXZlci5jb20iLCJhdXRoIjoibWVtYmVyIiwiZXhwIjoxNjYyNDYyNTQ4fQ.kvjvYs55RJu8dY5k4D1RsZzUcrNynPNJL3zkzkiuY2k";
    if (typeof accessToken === "string" && typeof req.headers !== "undefined") {
      req.headers.authorization = accessToken;
    }
    return req;
  },
  (err) => {
    return Promise.reject(err);
  }
);

export default instance;
