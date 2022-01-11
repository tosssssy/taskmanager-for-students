/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex } from '@chakra-ui/react'
import { GetServerSideProps } from 'next'
import { useSession, getSession } from 'next-auth/client'
import { useRouter } from 'next/router'
import React, { FC, useEffect, useState } from 'react'
import { Layout } from '../components/Layout'
import { Pagination } from '../components/schedule/Pagination'
import { Subject } from '../components/schedule/Subject'
import { SubjectType } from '../lib/types'
import { toStringYMD } from '../utils/toStringYMD'
import prisma from './../lib/prisma'

type Props = {
  subjects: SubjectType[]
}

const SchedulePage: FC<Props> = ({ subjects }) => {
  const router = useRouter()
  const [session] = useSession()

  useEffect(() => {
    if (!session) {
      router.replace('/')
    }
  }, [])

  // 全体のDate配列
  const [dateList, setDateList] = useState<{ date: Date; day: number }[]>([])
  const Day = ['日', '月', '火', '水', '木', '金', '土']

  // 全体の配列の最初と最後のDate
  let [start, setStart] = useState<Date>(null)
  let [end, setEnd] = useState<Date>(null)

  // 配列の表示範囲のDate
  const [firstYMD, setFirstYMD] = useState<Date>(null)
  const [lastYMD, setLastYMD] = useState<Date>(null)

  // 今週から何週目か
  const [currentWeekNum, setCurrentWeekNum] = useState(0)

  useEffect(() => {
    start = new Date(subjects[0]?.date)
    end = new Date(subjects[subjects.length - 1]?.date)
    // 最後の授業が土曜日の時の処理
    if (end.getDay() === 0) {
      end = new Date(subjects[subjects.length - 2]?.date)
    }

    setStart(start)
    setEnd(end)

    // 最初の日を日曜に
    while (true) {
      if (start.getDay() === 0) break
      start = new Date(
        start.getFullYear(),
        start.getMonth(),
        start.getDate() - 1
      )
    }

    // 最後の日を土曜に
    if (end.getDay() !== 6) {
      while (true) {
        if (end.getDay() === 6) break
        end = new Date(end.getFullYear(), end.getMonth(), end.getDate() + 1)
      }
    }

    // 指定された範囲を dateList に配列で格納
    let loop: Date = start
    while (loop <= end) {
      let loopDay = loop.getDay()
      dateList.push({ date: loop, day: loopDay })

      loop = new Date(loop.setDate(loop.getDate() + 1))
    }
    setDateList(dateList)
  }, [])

  // currentWeekNumに応じて表示範囲変更
  useEffect(() => {
    // 今週の日曜
    let thisSunday = new Date()
    while (true) {
      if (thisSunday.getDay() === 0) break
      thisSunday = new Date(
        thisSunday.getFullYear(),
        thisSunday.getMonth(),
        thisSunday.getDate() - 1
      )
    }
    // currentWeekNum 週間後の日曜を計算
    let newDate = new Date(thisSunday.getTime() + 604800000 * currentWeekNum)

    // その週の日曜
    setFirstYMD(newDate)

    newDate = new Date(
      newDate.getFullYear(),
      newDate.getMonth(),
      newDate.getDate() + 7
    )

    // その週の土曜
    setLastYMD(newDate)
  }, [currentWeekNum])

  return (
    <Layout>
      <Box h={170} />
      {subjects.length && (
        <>
          <Box textAlign='center' fontSize='25px'>
            {toStringYMD(firstYMD).slice(0, 4)}
          </Box>
          <Box
            p={'30px 20px 70px 20px'}
            minW={'375px'}
            maxW={'840px'}
            m={'auto'}
          >
            {/* 全日付 */}
            {dateList?.map((oneDay, index) => (
              <>
                {/* 範囲指定 */}
                {firstYMD <= oneDay.date && oneDay.date <= lastYMD && (
                  <Box
                    key={index}
                    my={5}
                    p={5}
                    bg={'white'}
                    borderRadius={'10px'}
                    shadow={'md'}
                  >
                    <Flex fontSize={18}>
                      {toStringYMD(oneDay.date).slice(5, 10)}
                      {'('}
                      {Day[oneDay.day] == '土' && (
                        <Box color='blue.400'>{Day[oneDay.day]}</Box>
                      )}
                      {Day[oneDay.day] == '日' && (
                        <Box color='red.400'>{Day[oneDay.day]}</Box>
                      )}
                      {Day[oneDay.day] != '土' && Day[oneDay.day] !== '日' && (
                        <Box>{Day[oneDay.day]}</Box>
                      )}
                      {')'}
                    </Flex>

                    <Flex flexWrap='wrap'>
                      {subjects?.map((subject) => (
                        <Box key={subject.id}>
                          {/* 授業がある日を表示 */}
                          {toStringYMD(oneDay.date).slice(0, 10) ==
                            toStringYMD(subject.date).slice(0, 10) && (
                            <Subject subject={subject} />
                          )}
                        </Box>
                      ))}
                    </Flex>
                    {/* <Box mt='20px' border='1px' borderColor='blue.200'></Box> */}
                  </Box>
                )}
              </>
            ))}
          </Box>

          <Pagination
            firstYMD={firstYMD}
            lastYMD={lastYMD}
            start={start}
            end={end}
            currentWeekNum={currentWeekNum}
            setCurrentWeekNum={setCurrentWeekNum}
          />
        </>
      )}
    </Layout>
  )
}

export default SchedulePage

//ユーザーのスケジュールを全取得（subjectのリスト）
export const getServerSideProps: GetServerSideProps = async ({ req }) => {
  const session = await getSession({ req })
  if (!session) return { props: { subjects: [] } }

  const data = await prisma.subject.findMany({
    where: {
      author: { id: Number(session.user.id) },
    },
    orderBy: {
      id: 'asc',
    },
  })

  const subjects = JSON.parse(JSON.stringify(data))

  return { props: { subjects } }
}
