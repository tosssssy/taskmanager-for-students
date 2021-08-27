import { NewSubjectProps } from "../../pages/create";

//1週間分のスケジュールをdateListに格納されているデータ数に埋め込む関数

export const useCreateNewSchedule = (
  dateList: string[],
  newSubjects: NewSubjectProps[]
) => {
  let newSchedule: NewSubjectProps[] = [];
  for (let i = 0; i < dateList.length; i++) {
    for (let j = 0; j < newSubjects.length; j++) {
      if (dateList[i]["substr"](0, 3) == newSubjects[j].newSubject.day) {
        let tmp = JSON.parse(JSON.stringify(newSubjects[j]));
        tmp.newSubject.date = dateList[i];
        newSchedule = newSchedule.concat(tmp);
      }
    }
  }

  return newSchedule;
};
