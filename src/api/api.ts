import { useQuery } from "react-query";
import instance, { arr } from "./core/axiosInstance";

const apis = {
  reissue: async () => {
    const requestRes = await instance.post(
      "/api/token",
      {
        nickname: sessionStorage.getItem("userName"),
      },
      {}
    );
    return requestRes.headers;
  },
  userRegister: async ({
    email,
    nickname,
    password,
    profileImg,
  }: {
    email: string;
    nickname: string;
    password: string;
    profileImg: string;
  }) => {
    try {
      const reqRes = await instance.post("/api/signup", {
        email,
        nickname,
        password,
        profileImg,
      });
      return reqRes;
    } catch (error) {
      throw error;
    }
  },
  userNicknameValidationCheck: async (nickname: string) => {
    try {
      const reqRes = await arr.post("api/nicknamecheck", {
        nickname,
      });
      return reqRes;
    } catch (error) {
      console.log(error);
    }
  },
  userEmailValidationCheck: async (email: string) => {
    try {
      const reqRes = await arr.post("api/emailcheck", {
        email,
      });
      return reqRes;
    } catch (error) {
      console.log(error);
    }
  },
  userLogin: async ({
    email,
    password,
  }: {
    email: string;
    password: string;
  }) => {
    try {
      const reqRes = await instance.post("/api/login", {
        email,
        password,
      });
      return reqRes;
    } catch (error) {
      throw error;
    }
  },
  kakaoLogin: async (code: string) => {
    try {
      const reqRes = await instance.post("/api/kakaologin", {
        code,
      });
      return reqRes;
    } catch (error) {
      throw error;
    }
  },
  getMyChallengeList: async () => {
    try {
      const reqRes = await instance.get("/api/joinposts");
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  getFUllChallengeList: async (pageNum: number, sizeNum: number) => {
    try {
      const reqRes = await instance.get(
        `/api/posts?challengeId=${pageNum}&size=${sizeNum}`
      );
      console.log(reqRes);
      return reqRes;
    } catch (error) {
      throw error;
    }
  },
  getMyInfo: async () => {
    try {
      const reqRes = await instance.get("/api/mypage/myinfo");
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  getMyInfoChall: async (pageNum: number) => {
    try {
      const reqRes = await instance.get(
        `/api/mypage/joinchallenge?pageNum=${pageNum}`
      );
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  getMyInfoDoneChall: async (pageNum: number) => {
    try {
      const reqRes = await instance.get(
        `/api/mypage/finishchallenge?pageNum=${pageNum}`
      );
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  modifyMyInfo: async (payload: { nickname: string; profileImg: string }) => {
    const reqRes = await instance.put("/api/mypage/member", {
      nickName: payload.nickname,
      profileImg: payload.profileImg,
    });
    return reqRes;
  },
  postChallenge: async ({
    title,
    challengeImg,
    startDay,
    startTime,
    targetTime,
    content,
    notice,
    challengeTag,
  }: {
    title: string;
    challengeImg: string;
    startDay: string;
    startTime: string;
    targetTime: number;
    content: string;
    notice: string;
    challengeTag: string[];
  }) => {
    try {
      const reqRes = await instance.post("/api/challenge", {
        title,
        challengeImg,
        startDay,
        startTime,
        targetTime,
        content,
        notice,
        challengeTag,
        limit: 16,
      });
      const reReq = await instance.post(
        `/api/challenge/ok/${reqRes.data.data}`
      );
      return reqRes.data.msg;
    } catch (error) {
      throw error;
    }
  },
  modifyChallenge: async ({
    title,
    challengeImg,
    startDay,
    startTime,
    targetTime,
    content,
    notice,
    challengeTag,
    challengeId,
  }: {
    title: string;
    challengeImg: string;
    startDay: string;
    startTime: string;
    targetTime: number;
    content: string;
    notice: string;
    challengeTag: string[];
    challengeId: number;
  }) => {
    try {
      const reqRes = await instance.put(`/api/challenge/${challengeId}`, {
        title,
        challengeImg,
        startDay,
        startTime,
        targetTime,
        content,
        notice,
        challengeTag,
        limit: 16,
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
      console.log(reqRes);
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
      const reqRes = await instance.get(`/api/rank?pageNum=${pageNum}&size=10`);
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  getParticipantList: async (challengeId: number) => {
    try {
      const reqRes = await instance.get(`/api/chat/list/${challengeId}`);
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  searchChallengeList: async (
    searchParam: string | undefined,
    pageNum: number
  ) => {
    try {
      const reqRes = await instance.get(
        `/api/search?keyword=${searchParam}&pageNum=${pageNum}`
      );
      return reqRes.data;
    } catch (error) {
      throw error;
    }
  },
  searchTitle: async (searchParam: string) => {
    const reqRes = await instance.get(`/api/relation?word=${searchParam}`);
    return reqRes.data;
  },
};
export default apis;
