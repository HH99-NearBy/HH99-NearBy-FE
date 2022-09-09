import instance from "./core/axiosInstance";
const apis = {
  reissue: async (refreshToken: string) => {
    const requestRes = await instance.get("/api/reissue", {
      headers: {
        "Refresh-Token": refreshToken,
      },
    });

    return requestRes.headers;
  },
  getOVToken: async (callback: (token: string) => {}) => {
    try {
      const reqRes = await instance.get("/api/openvidu/getToken");
      callback(reqRes.data);
      return reqRes.data;
    } catch (error) {
      console.log(error);
    }
  },
  getMyChallengeList: async () => {
    try {
      const reqRes = await instance.get("/api/myList");
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
};
export default apis;
