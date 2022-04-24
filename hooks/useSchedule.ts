import dayjs, { Dayjs } from 'dayjs'
import { useState, useEffect, useMemo } from 'react'
import { SubjectType } from '../lib/types'

const setStartAndEnd = (subjects: SubjectType[]) => {
  // 全体の配列の最初と最後のDate
  let startDate = dayjs(subjects[0]?.date.toString().slice(0, 10))
  let endDate = dayjs(
    subjects[subjects.length - 1]?.date.toString().slice(0, 10)
  )
  // 最初の日を日曜に
  startDate = startDate.day(0)
  // 最後の日を土曜に
  endDate = endDate.day(6)

  return { startDate, endDate }
}

const setDateList = (startDate: Dayjs, endDate: Dayjs) => {
  const dateList: string[] = []
  // 指定された範囲を dateList に配列で格納
  const days = endDate.diff(startDate, 'day')

  for (let i = 0; i <= days; i++) {
    dateList.push(startDate.format('YYYY-MM-DD'))
    startDate = startDate.add(1, 'day')
  }

  return dateList
}

export const useSchedule = (subjects: SubjectType[]) => {
  // subjectsの最初と最後の日付のDayjsオブジェクト
  const { startDate, endDate } = useMemo(
    () => setStartAndEnd(subjects),
    [subjects]
  )
  // 全体の日付(YYYY-MM-DD)の配列
  const dateList = useMemo(
    () => setDateList(startDate, endDate),
    [startDate, endDate]
  )
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

  return {
    startDate,
    endDate,
    dateList,
    firstViewDate,
    lastViewDate,
    currentWeekNum,
    setCurrentWeekNum,
  }
}
