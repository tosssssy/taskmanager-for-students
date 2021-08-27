export const useCreateDateList = (startDate: string, endDate: string) => {
  let dateList: string[] = [];
  let start = new Date(startDate);
  let end = new Date(endDate);

  while (start <= end) {
    dateList.push(start.toDateString()); //格納 e.g."Sat Aug 28 2021"
    start.setDate(start.getDate() + 1); //次の日に変える
  }

  return dateList;
};
