export const useCreateDateList = (startDate: string, endDate: string) => {
  let dateList: Date[] = [];
  let start = new Date(startDate);
  let end = new Date(endDate);

  while (start <= end) {
    start.setDate(start.getDate() + 1); //次の日に変える
    let tmp = JSON.parse(JSON.stringify(start));
    dateList.push(tmp); //格納 e.g."Mon Oct 04 2021 00:00:00 GMT+0900 (日本標準時)"
  }
  return dateList;
};
