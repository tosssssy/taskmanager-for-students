/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps } from 'next'
import { getSession } from 'next-auth/client'

import Head from 'next/head'
import React, { FC } from 'react'
import { Layout } from '../components/Layout'
import { Welcome } from '../components/top/Welcome'
const TopPage: FC = () => {
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

export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession()

  if (session) {
    return {
      redirect: {
        destination: '/schedule',
        permanent: false,
      },
    }
  }

  return { props: {} }
}
