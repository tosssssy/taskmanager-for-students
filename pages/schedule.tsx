import dayjs from 'dayjs'
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import { FC } from 'react'
import { Layout } from '../components/Layout'
import { ScheduleList } from '../components/schedule/ScheduleList'
import { PlzNew } from '../components/top/PlzNew'
import { SubjectType } from '../lib/types'
import prisma from './../lib/prisma'

type Props = {
  subjects: SubjectType[]
}

const SchedulePage: FC<Props> = ({ subjects }) => {
  return (
    <Layout>
      <Head>
        <title>Task Manager | スケジュール</title>
      </Head>
      {subjects.length > 0 ? <ScheduleList subjects={subjects} /> : <PlzNew />}
    </Layout>
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
      id: 'asc',
    },
  })

  const subjects = JSON.parse(JSON.stringify(data))

  return { props: { subjects } }
}
