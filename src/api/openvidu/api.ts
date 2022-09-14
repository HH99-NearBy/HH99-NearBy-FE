import ovInstance from "./core/ovInstance";
const ovApis = {
  getOVToken: async (callback: (token: string) => {}) => {
    try {
      const reqRes = await ovInstance.post("/api-sessions/get-token", {
        sessionName: "newSession",
      });
      console.log(reqRes);
      console.log(reqRes.data[0]);
      callback(reqRes.data[0]);
    } catch (error) {
      throw error;
    }
  },
};
export default ovApis;
