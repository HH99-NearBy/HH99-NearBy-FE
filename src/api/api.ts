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
      const reqRes = await instance.post("/api-sessions/get-token", {
        sessionName: "newSession",
      });
      console.log(reqRes);
      console.log(reqRes.data[0]);
      callback(reqRes.data[0]);
    } catch (error) {
      throw error;
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
  getFUllChallengeList: async (pageNum: number) => {
    try {
      const reqRes = await instance.get(`/api/posts?pagenum=${pageNum}`);
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  getMyInfo: async (userName: string) => {
    try {
      const reqRes = await instance.get("/api/member");
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  modifyMyInfo: async (payload: { nickname: string; profileImg: string }) => {
    const reqRes = await instance.put("/api/member", {
      nickname: payload.nickname,
      profileImg: payload.profileImg,
    });
    return reqRes.data;
  },
  postChallenge: async ({
    title,
    postImg,
    password,
    startTime,
    targetTime,
    description,
  }: {
    title: string;
    postImg: string;
    password: string;
    startTime: string;
    targetTime: string;
    description: string;
  }) => {
    try {
      const reqRes = await instance.post("/api/challenge", {
        title,
        postImg,
        password,
        startTime,
        targetTime,
        description,
      });
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  modifyChallenge: async ({
    title,
    postImg,
    password,
    startTime,
    targetTime,
    description,
  }: {
    title: string;
    postImg: string;
    password: string;
    startTime: string;
    targetTime: string;
    description: string;
  }) => {
    try {
      const reqRes = await instance.post("/api/challenge", {
        title,
        postImg,
        password,
        startTime,
        targetTime,
        description,
      });
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  deleteChallenge: async (challengeId: number) => {
    try {
      const reqRes = await instance.delete(`/api/challenge/${challengeId}`);
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  recruitChallenge: async (challengeId: number) => {
    try {
      const reqRes = await instance.post(`/api/challenge/ok/${challengeId}`);
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  cancelRecruit: async (challengeId: number) => {
    try {
      const reqRes = await instance.post(
        `/api/challenge/cancel/${challengeId}`
      );
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  getUserRanking: async (pageNum: number) => {
    try {
      const reqRes = await instance.get(
        `/api/ranking?pagenum=${pageNum}&pagelimit=20`
      );
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
};
export default apis;
