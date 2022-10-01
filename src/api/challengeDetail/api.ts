import instance from "../core/axiosInstance";
import { GetModalDetail } from "./types";

export const getChallengeDetail = async (postId: number) => {
  try {
    const { data } = await instance.get<GetModalDetail>(
      `/api/challenge/${postId}`
    );
    return data;
  } catch (error) {
    throw error;
  }
};
