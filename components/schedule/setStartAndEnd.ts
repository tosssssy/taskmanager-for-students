import dayjs from 'dayjs'
import { SubjectType } from '../../lib/types'

export const setStartAndEnd = (subjects: SubjectType[]) => {
  // 全体の配列の最初と最後のDate
  let start = dayjs(subjects[0]?.date.toString().slice(0, 10))
  let end = dayjs(subjects[subjects.length - 1]?.date.toString().slice(0, 10))

  // 最初の日を日曜に
  start = start.day(0)

  // 最後の日を土曜に
  end = end.day(6)

  return { start, end }
}
