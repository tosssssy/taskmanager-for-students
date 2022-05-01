export type SubjectType = {
  id: number
  name: string
  date: Date
  period: number
  day: string
  status: 0 | 1 | 2 | 3
  memo?: string
}

export type NewSubjectType = Pick<SubjectType, 'name' | 'date' | 'period' | 'day'> & {
  authorId: number
}

export type UpdateSubjectType = Pick<SubjectType, 'id' | 'status' | 'memo'>
