export interface GetModalDetail {
  detailModal: {
    title: string;
    challengeImg: string;
    startDay: string;
    startTime: string;
    targetTime: number;
    endTime: string;
    limitPeople: number;
    participatePeople: number;
    content: string;
    notice: string;
    writer: string;
    level: string;
    challengeTag: string[];
  };
  msg: string;
}
