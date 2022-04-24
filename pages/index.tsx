/* eslint-disable react-hooks/exhaustive-deps */
import { GetServerSideProps, NextPage } from 'next'
import { useSession, getSession } from 'next-auth/client'
import Head from 'next/head'
import Router from 'next/router'
import React from 'react'
import { Layout } from '../components/Layout'
import { Welcome } from '../components/top/Welcome'

const TopPage: NextPage = () => {
  const [session] = useSession()
  if (session) Router.push('/schedule')

  return (
    <>
      <Head>
        <title>Task Manager</title>
      </Head>
      <Layout>
        <Welcome />
      </Layout>
    </>
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
