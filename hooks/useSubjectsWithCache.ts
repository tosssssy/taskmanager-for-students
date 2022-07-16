import { useCallback, useEffect, useState } from 'react'
import { SubjectType, UpdateSubjectType } from '../types/subject'
import { putApi } from '../utils/api'
import { useGetApi } from './useApi'

export const useSubjectsWithCache = (currentWeekNum: number, initSubjects: SubjectType[]) => {
  const [subjects, setSubjects] = useState<SubjectType[]>(initSubjects)
  const { data: currentWeekData, mutate } = useGetApi<SubjectType[]>(
    `/api/subjects?page=${currentWeekNum}`
  )
  useEffect(() => {
    setSubjects((postData) => {
      if (!currentWeekData) {
        return postData
      }
      const merged = [...postData, ...currentWeekData]
      const unique = Array.from(new Map(merged.map((v) => [v.id, v])).values())
      return unique
    })

    return () => setSubjects([])
  }, [currentWeekData])

  const updateSubject = useCallback(
    async (newSubject: UpdateSubjectType) => {
      try {
        await putApi('/api/subjects', newSubject)
        await mutate((postData) =>
          postData?.map((v) => (v.id === newSubject.id ? { ...v, ...newSubject } : v))
        )
      } catch (error) {
        console.error(error)
      }
    },
    [mutate]
  )

  // プリフェッチしてキャッシュを保持しておく
  useGetApi<SubjectType[]>(`/api/subjects?page=${currentWeekNum - 1}`)
  useGetApi<SubjectType[]>(`/api/subjects?page=${currentWeekNum + 1}`)

  return { subjects, updateSubject }
}
