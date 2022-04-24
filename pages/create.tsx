import { Box } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useCallback, useState } from 'react'
import { Layout } from '../components/Layout'
import { Loading } from '../components/Loading'
import { DateListCreator } from '../components/create/DateListCreator'
import { createNewScheduleList } from '../components/create/createNewScheduleList'
import { NewSubjectType } from '../lib/types'
import { CreateButton } from './../components/create/CreateButton'
import { SubjectCreator } from './../components/create/SubjectCreator'

const CreatePage: NextPage = () => {
  const [newSubjects, setNewSubjects] = useState<NewSubjectType[]>([])
  const [dateList, setDateList] = useState<Date[]>([])

  const [loading, setLoading] = useState<boolean>(false)

  // ユーザーの全データを削除してから新規作成
  const createNewSchedule = useCallback(async () => {
    setLoading(true)
    try {
      await fetch('/api/delete', { method: 'DELETE' })

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
  }, [dateList, newSubjects])

  if (loading) return <Loading />
  return (
    <>
      <Head>
        <title>Task Manager | 新規作成</title>
      </Head>

      <Layout>
        <Box h={200} />
        <DateListCreator setDateList={setDateList} />
        <SubjectCreator
          newSubjects={newSubjects}
          setNewSubjects={setNewSubjects}
        />
        <CreateButton onclick={createNewSchedule} />
      </Layout>
    </>
  )
}

export default CreatePage

// export const getServerSideProps: GetServerSideProps = async ({ req }) => {
//   const session = await getSession()

//   if (!session) {
//     return {
//       redirect: {
//         destination: '/',
//         permanent: false,
//       },
//     }
//   }

//   return { props: {} }
// }
