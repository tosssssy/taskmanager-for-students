import { Box } from '@chakra-ui/react'
import Router from 'next/router'
import React, { FC, useState } from 'react'
import { Layout } from '../components/Layout'
import { DateListCreator } from '../components/create/DateListCreator'
import { createNewScheduleList } from '../components/create/createNewScheduleList'
import { NewSubjectType } from '../lib/types'
import { CreateButton } from './../components/create/CreateButton'
import { SubjectCreator } from './../components/create/SubjectCreator'

const CreatePage: FC = () => {
  const [newSubjects, setNewSubjects] = useState<Array<NewSubjectType>>([])
  const [dateList, setDateList] = useState<Array<Date>>([])

  // ユーザーの全データを削除してから新規作成
  const createNewSchedule = async () => {
    try {
      await fetch('api/delete', { method: 'DELETE' })

      const body = createNewScheduleList(dateList, newSubjects)

      await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
    Router.push('/schedule')
  }

  return (
    <Layout>
      <Box h={200} />

      <DateListCreator setDateList={setDateList} />

      <SubjectCreator
        newSubjects={newSubjects}
        setNewSubjects={setNewSubjects}
      />

      <CreateButton onclick={createNewSchedule} />
    </Layout>
  )
}

export default CreatePage
