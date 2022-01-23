import dayjs, { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'

export const useSetViewRange = () => {
  // 配列の表示範囲のDate
  const [firstViewDate, setFirstViewDate] = useState<Dayjs>(dayjs())
  const [lastViewDate, setLastViewDate] = useState<Dayjs>(dayjs())

  // 今週から何週目か
  const [currentWeekNum, setCurrentWeekNum] = useState(0)

  // currentWeekNumに応じて表示範囲変更
  useEffect(() => {
    // currentWeekNum 週間後の日曜を計算
    let newDate = dayjs().day(0).add(currentWeekNum, 'week')

    // その週の日曜
    setFirstViewDate(newDate)

    // その週の土曜
    setLastViewDate(newDate.day(6))
  }, [currentWeekNum])

  return { firstViewDate, lastViewDate, currentWeekNum, setCurrentWeekNum }
}
