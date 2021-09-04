import { NewSubjectType } from "../../lib/types";

//1週間分のスケジュールをdateListに格納されているデータ数だけ埋め込む関数
// newSubject = {
//   name: "Bob";
//   date: null;  ←ここに new Date()して入れる
//   period: 3;
//   day: Sat;
// };
export const useCreateNewSchedule = (
  dateList: Date[],
  newSubjects: NewSubjectType[]
) => {
  let newSchedule: NewSubjectType[] = [];

  for (let i = 0; i < dateList.length; i++) {
    for (let j = 0; j < newSubjects.length; j++) {
      const date = new Date(dateList[i]);

      // "Sun" == "Sat" => false
      if (date.toUTCString()["substr"](0, 3) == newSubjects[j].newSubject.day) {
        let tmp = JSON.parse(JSON.stringify(newSubjects[j]));
        tmp.newSubject.date = dateList[i];
        newSchedule = newSchedule.concat(tmp);
      }
    }
  }

  return newSchedule;
};
