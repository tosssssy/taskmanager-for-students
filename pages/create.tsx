import { Box, Text, TextProps } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useCallback, useState } from 'react'
import { Layout } from '../components/Layout'
import { Loading } from '../components/Loading'
import { DateSelect } from '../components/create/DateSelect'
import { NewSubjectType } from '../lib/types'
import { createNewScheduleList } from '../utils/subjectCreate'
import { CreateButton } from './../components/create/CreateButton'
import { SubjectCreator } from './../components/create/SubjectCreator'

const textProps: TextProps = {
  my: '30px',
  ml: '10%',
  pr: '10%',
  color: 'blackAlpha.800',
}

const CreatePage: NextPage = () => {
  const [newSubjectList, setNewSubjectList] = useState<NewSubjectType[]>([])
  const [dateList, setDateList] = useState<Date[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)

  // ユーザーの全データを削除してから新規作成
  const createNewSchedule = useCallback(async () => {
    setIsLoading(true)
    try {
      await fetch('/api/delete', { method: 'DELETE' })
      const body = createNewScheduleList(dateList, newSubjectList)
      await fetch('/api/create', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })
    } catch (error) {
      console.error(error)
    }
    Router.push('/schedule')
  }, [dateList, newSubjectList])

  return (
    <>
      <Head>
        <title>Task Manager | 新規作成</title>
      </Head>

      <Layout>
        {isLoading ? (
          <Loading />
        ) : (
          <>
            <Box h={200} />
            <Text {...textProps}>
              ①授業の始まる日、終わる日を選択して下さい
            </Text>
            <DateSelect onUpdate={(dateList) => setDateList(dateList)} />

            <Text {...textProps}>
              ②授業の曜日、時限を選択し、教科名を入力して下さい
            </Text>
            <SubjectCreator
              newSubjectList={newSubjectList}
              onAdd={(newSubject) => {
                setNewSubjectList((subjects) => [...subjects, newSubject])
              }}
              onDelete={(index) =>
                setNewSubjectList((subjects) =>
                  subjects.filter((_, i) => i !== index)
                )
              }
            />

            <Text {...textProps}>
              ③時間割を確認し、完成ボタンを押して下さい。
            </Text>
            <CreateButton onclick={createNewSchedule} />
          </>
        )}
      </Layout>
    </>
  )
}

export default CreatePage
