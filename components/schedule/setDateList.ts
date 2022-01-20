import { Dayjs } from 'dayjs'

// eslint-disable-next-line react-hooks/rules-of-hooks
export const setDateList = (start: Dayjs, end: Dayjs) => {
  const dateList: string[] = []

  // 指定された範囲を dateList に配列で格納
  const days = end.diff(start, 'day')

  for (let i = 0; i < days; i++) {
    dateList.push(start.format('YYYY-MM-DD'))
    start = start.add(1, 'day')
  }

  return dateList
}
