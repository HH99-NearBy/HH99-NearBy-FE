import instance from "../core/axiosInstance";
import { GetModalDetail } from "./types";

export const getChallengeDetail = async (postId: number) => {
  try {
    console.log(postId);
    const { data } = await instance.get<GetModalDetail>(
      `/api/challenge/${postId}`
    );
    console.log(data);
    return data;
  } catch (error) {
    throw error;
  }
};
