import dayjs from 'dayjs'
import { GetServerSideProps, InferGetServerSidePropsType } from 'next'
import { getSession } from 'next-auth/client'
import Head from 'next/head'
import { FC } from 'react'
import { Header } from '../components/Header'
import { ScheduleList } from '../components/schedule/ScheduleList'
import { PlzNew } from '../components/top/PlzNew'
import { SubjectType } from '../types/subject'
import prisma from './../lib/prisma'

type ServerSideProps = {
  subjects: SubjectType[]
}

type PageProps = InferGetServerSidePropsType<typeof getServerSideProps>

const SchedulePage: FC<PageProps> = ({ subjects }) => {
  return (
    <>
      <Head>
        <title>Task Manager | スケジュール</title>
      </Head>

      <Header rightButtonName='新規作成' rightButtonPath='/create' />

      {subjects.length > 0 ? <ScheduleList mt={50} subjects={subjects} /> : <PlzNew />}
    </>
  )
}

export default SchedulePage

//ユーザーのスケジュールを3週間分先に取得（subjectのリスト）
export const getServerSideProps: GetServerSideProps<ServerSideProps> = async ({ req }) => {
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
        gte: dayjs().day(-1).add(-1, 'week').toISOString(),
        lte: dayjs().day(6).add(1, 'week').toISOString(),
      },
    },
  })

  // prismaの型定義は使わない方針のため
  const subjects = JSON.parse(JSON.stringify(data)) as SubjectType[]
  return {
    props: {
      subjects,
    },
  }
}
