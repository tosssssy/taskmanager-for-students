import { NewSubjectType } from '../types/subject'

// はじめの日付から終わりの日付までの日数分dateListに入れて返す
export const createDateList = (startDate: string, endDate: string) => {
  // バグ回避（今後直す）
  let tmpStart = new Date(startDate)
  let start = new Date(tmpStart.setDate(tmpStart.getDate() - 1))
  let end = new Date(endDate)
  let dateList: Date[] = []

  while (start <= end) {
    start.setDate(start.getDate() + 1) //次の日に変える
    let tmp = JSON.parse(JSON.stringify(start)) //ディープコピー
    dateList.push(tmp) //格納 e.g."Mon Oct 04 2021 00:00:00 GMT+0900 (日本標準時)"
  }
  return dateList
}

//1週間分のスケジュールをdateListに格納されているデータ数だけ埋め込む関数
// newSubject = {
//   name: "Bob";
//   date: null;  ←ここに new Date()して入れる
//   period: 3;
//   day: Sat;
// };
export const createNewScheduleList = (dateList: Date[], newSubjects: NewSubjectType[]) => {
  let newSchedule: NewSubjectType[] = []

  for (let i = 0; i < dateList.length; i++) {
    for (let j = 0; j < newSubjects.length; j++) {
      const date = new Date(dateList[i])

      // "Sun" == "Sat" => false
      if (date.toUTCString().slice(0, 3) == newSubjects[j].day) {
        let tmp = JSON.parse(JSON.stringify(newSubjects[j]))
        tmp.date = dateList[i]
        newSchedule = newSchedule.concat(tmp)
      }
    }
  }

  return newSchedule
}
