// はじめの日付から終わりの日付までの日数分dateListに入れて返す
export const useCreateDateList = (startDate: string, endDate: string) => {
  let start = new Date(startDate);
  let end = new Date(endDate);
  let dateList: Date[] = [];

  while (start <= end) {
    start.setDate(start.getDate() + 1); //次の日に変える
    let tmp = JSON.parse(JSON.stringify(start)); //ディープコピー
    dateList.push(tmp); //格納 e.g."Mon Oct 04 2021 00:00:00 GMT+0900 (日本標準時)"
  }
  return dateList;
};
