import dayjs, { Dayjs } from 'dayjs'
import { useState, useEffect } from 'react'
import { SubjectType } from '../../lib/types'

export const useSetStartAndEnd = (subjects: SubjectType[]) => {
  // 全体の配列の最初と最後のDate
  let [start, setStart] = useState<Dayjs>(dayjs())
  let [end, setEnd] = useState<Dayjs>(dayjs())

  useEffect(() => {
    // eslint-disable-next-line react-hooks/exhaustive-deps
    start = dayjs(subjects[0]?.date.toString().slice(0, 10))
    // 最後の授業が土曜日の時の処理
    // eslint-disable-next-line react-hooks/exhaustive-deps
    end = dayjs(subjects[subjects.length - 1]?.date.toString().slice(0, 10))

    // 最初の日を日曜に
    setStart(start.day(0))

    // 最後の日を土曜に
    setEnd(end.day(6))
  }, [])

  return { start, end }
}
