import { Dayjs } from 'dayjs'

export const setDateList = (startDate: Dayjs, endDate: Dayjs) => {
  const dateList: string[] = []

  // 指定された範囲を dateList に配列で格納
  const days = endDate.diff(startDate, 'day')

  for (let i = 0; i <= days; i++) {
    dateList.push(startDate.format('YYYY-MM-DD'))
    startDate = startDate.add(1, 'day')
  }

  return dateList
}
