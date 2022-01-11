/* eslint-disable react-hooks/exhaustive-deps */
import { useSession } from 'next-auth/client'
import Router from 'next/router'
import React, { FC } from 'react'
import { Layout } from '../components/Layout'
import { Welcome } from '../components/top/Welcome'
const TopPage: FC = () => {
  const [session] = useSession()
  if (session) {
    Router.push('/schedule')
  }

  return (
    <Layout>
      <Welcome />
    </Layout>
  )
}

export default TopPage
