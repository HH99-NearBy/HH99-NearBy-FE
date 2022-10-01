import ovInstance from "./core/ovInstance";
const ovApis = {
  getOVToken: async (callback: (token: string) => {}, challengeId: number) => {
    try {
      const reqRes = await ovInstance.post("/api-sessions/get-token", {
        sessionName: challengeId,
      });
      callback(reqRes.data.data[0]);
    } catch (error) {
      throw error;
    }
  },
};
export default ovApis;
