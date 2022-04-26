/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import React, { FC, useEffect, useState } from 'react'
import { useSchedule } from '../../hooks/useSchedule'
import { SubjectType } from '../../types/subject'
import { getApi } from '../../utils/api'
import { Pagination } from './Pagination'
import { Subject } from './Subject'

// DBから取得できる日付は'2022-01-09T00:00:00.000Z'というフォーマット
// タイムゾーン周りでずれが生じる可能性があるのでdayjs(2022-01-09)として扱っている
dayjs.extend(isBetween)
const Day = ['日', '月', '火', '水', '木', '金', '土']

type Props = {
  subjects: SubjectType[]
}

export const ScheduleList: FC<Props> = ({ subjects: initSubjects }) => {
  const [subjects, setSubjects] = useState(initSubjects)
  const {
    startDate,
    endDate,
    dateList,
    firstViewDate,
    lastViewDate,
    currentWeekNum,
    setCurrentWeekNum,
  } = useSchedule(subjects)

  useEffect(() => {
    const getAllSubjects = async () => {
      try {
        const response = await getApi<SubjectType[]>('/api/subjects')
        setSubjects(response || [])
      } catch (e) {
        console.error(e)
      }
    }
    getAllSubjects()
  }, [])

  return (
    <>
      <Box h={50} />
      {subjects.length && (
        <>
          <Box textAlign='center' fontSize='25px'>
            {firstViewDate.format('YYYY')}
          </Box>
          <Box
            p={'30px 20px 70px 20px'}
            minW={'375px'}
            maxW={'840px'}
            m={'auto'}
          >
            {dateList?.map((oneDay, index) => {
              const oneDayjs = dayjs(oneDay)
              return (
                <>
                  {oneDayjs.isBetween(
                    firstViewDate.subtract(1, 'day'),
                    lastViewDate
                  ) && (
                    <Box
                      key={index}
                      my={5}
                      p={5}
                      bg={'white'}
                      borderRadius={'10px'}
                      shadow={'md'}
                    >
                      <Flex fontSize={18}>
                        {oneDayjs.format('M-D')}
                        {'('}
                        {Day[oneDayjs.day()] == '土' && (
                          <Box color='blue.400'>{Day[oneDayjs.day()]}</Box>
                        )}
                        {Day[oneDayjs.day()] == '日' && (
                          <Box color='red.400'>{Day[oneDayjs.day()]}</Box>
                        )}
                        {Day[oneDayjs.day()] != '土' &&
                          Day[oneDayjs.day()] !== '日' && (
                            <Box>{Day[oneDayjs.day()]}</Box>
                          )}
                        {')'}
                      </Flex>

                      <Flex flexWrap='wrap'>
                        {subjects?.map((subject) => (
                          <Box key={subject.id}>
                            {/* 授業がある日を表示 */}
                            {oneDayjs.format('YYYY-MM-DD') ==
                              String(subject.date).slice(0, 10) && (
                              <Subject subject={subject} />
                            )}
                          </Box>
                        ))}
                      </Flex>
                    </Box>
                  )}
                </>
              )
            })}
          </Box>

          <Pagination
            firstViewDate={firstViewDate}
            lastViewDate={lastViewDate}
            startDate={startDate}
            endDate={endDate}
            currentWeekNum={currentWeekNum}
            setCurrentWeekNum={setCurrentWeekNum}
          />
        </>
      )}
    </>
  )
}

// Component definition is missing display name のESLintエラー回避
ScheduleList.displayName = 'ScheduleList'
