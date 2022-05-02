import dayjs, { Dayjs } from 'dayjs'
import { useState, useMemo } from 'react'

const setDateList = (firstViewDate: Dayjs, lastViewDate: Dayjs) => {
  const dateList: string[] = []
  // 指定された範囲を dateList に配列で格納
  const days = lastViewDate.diff(firstViewDate, 'day')

  for (let i = 0; i <= days; i++) {
    dateList.push(firstViewDate.format('YYYY-MM-DD'))
    firstViewDate = firstViewDate.add(1, 'day')
  }

  return dateList
}

export const useSchedule = () => {
  // 今週から何週目か
  const [currentWeekNum, setCurrentWeekNum] = useState(0)

  // 配列の表示範囲のDate
  const firstViewDate = dayjs().day(0).add(currentWeekNum, 'week')
  const lastViewDate = dayjs().day(6).add(currentWeekNum, 'week')

  // 表示範囲の(YYYY-MM-DD)の配列
  const dateList = useMemo(
    () => setDateList(firstViewDate, lastViewDate),
    [firstViewDate, lastViewDate]
  )

  return {
    dateList,
    currentWeekNum,
    setCurrentWeekNum,
  }
}
