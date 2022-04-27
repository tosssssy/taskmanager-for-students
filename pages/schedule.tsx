import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import { FC } from 'react'
import { Header } from '../components/Header'
import { ScheduleList } from '../components/schedule/ScheduleList'
import { PlzNew } from '../components/top/PlzNew'
import { SubjectType } from '../types/subject'
import prisma from './../lib/prisma'

type Props = {
  subjects: SubjectType[]
}

const SchedulePage: FC<Props> = ({ subjects }) => {
  return (
    <>
      <Head>
        <title>Task Manager | スケジュール</title>
      </Head>

      <Header rightButtonName='新規作成' rightButtonPath='/create' />

      {subjects.length > 0 ? (
        <ScheduleList mt={50} subjects={subjects} />
      ) : (
        <PlzNew />
      )}
    </>
  )
}

export default SchedulePage

//ユーザーのスケジュールを2週間分先に取得（subjectのリスト）
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session)
    return {
      redirect: {
        destination: '/',
        permanent: false,
      },
    }

  const data = await prisma.subject.findMany({
    where: {
      author: { id: Number(session.id) },
      date: {
        gte: dayjs().add(-1, 'week').toISOString(),
        lte: dayjs().add(1, 'week').toISOString(),
      },
    },
    orderBy: {
      date: 'asc',
    },
  })

  const subjects = JSON.parse(JSON.stringify(data))

  return { props: { subjects } }
}
