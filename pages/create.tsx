import { Box, Text, TextProps } from '@chakra-ui/react'
import { NextPage } from 'next'
import Head from 'next/head'
import Router from 'next/router'
import React, { useCallback, useState } from 'react'
import { useSWRConfig } from 'swr'
import { Header } from '../components/Header'
import { Loading } from '../components/Loading'
import { DateSelect } from '../components/create/DateSelect'
import { NewSubjectType } from '../types/subject'
import { deleteApi, postApi } from '../utils/api'
import { createNewScheduleList } from '../utils/subjectCreate'
import { CreateButton } from './../components/create/CreateButton'
import { SubjectCreator } from './../components/create/SubjectCreator'

const textProps: TextProps = {
  my: '30px',
  pr: '10%',
  color: 'blackAlpha.800',
}

const CreatePage: NextPage = () => {
  const [newSubjectList, setNewSubjectList] = useState<NewSubjectType[]>([])
  const [dateList, setDateList] = useState<Date[]>([])
  const [isLoading, setIsLoading] = useState<boolean>(false)
  const { cache: c } = useSWRConfig()

  // ユーザーの全データを削除してから新規作成
  const createNewSchedule = useCallback(async () => {
    setIsLoading(true)
    try {
      await deleteApi('/api/subjects')
      const data = createNewScheduleList(dateList, newSubjectList)
      await postApi('/api/subjects', data)
    } catch (error) {
      console.error(error)
    }

    // swrで型定義されていないため
    const cache = c as any
    cache.clear()

    Router.push('/schedule')
  }, [c, dateList, newSubjectList])

  return (
    <>
      <Head>
        <title>Task Manager | 新規作成</title>
      </Head>

      <Header rightButtonName='スケジュール' rightButtonPath='/schedule' />

      {isLoading ? (
        <Loading />
      ) : (
        <Box my={'80px'} mx={'auto'} maxW='700px' px={5}>
          <Text {...textProps}>①授業の始まる日、終わる日を選択して下さい</Text>
          <DateSelect onUpdate={(dateList) => setDateList(dateList)} />

          <Text {...textProps}>②授業の曜日、時限を選択し、教科名を入力して下さい</Text>
          <SubjectCreator
            newSubjectList={newSubjectList}
            onAdd={(newSubject) => {
              setNewSubjectList((subjects) => [...subjects, newSubject])
            }}
            onDelete={(index) =>
              setNewSubjectList((subjects) => subjects.filter((_, i) => i !== index))
            }
          />

          <Text {...textProps}>③時間割を確認し、完成ボタンを押して下さい。</Text>
          <CreateButton onclick={createNewSchedule} />
        </Box>
      )}
    </>
  )
}

export default CreatePage
