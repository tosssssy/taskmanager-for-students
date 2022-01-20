/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/client'
import Head from 'next/head'
import { useRouter } from 'next/router'
import React, { FC } from 'react'
import { Layout } from '../components/Layout'
import { Welcome } from '../components/top/Welcome'
const TopPage: FC = () => {
  const [session] = useSession()
  const router = useRouter()
  if (session) {
    router.replace('/schedule')
  }

  return (
    <Layout>
      <Head>
        <title>Task Manager</title>
      </Head>
      <Welcome />
    </Layout>
  )
}

export default TopPage
