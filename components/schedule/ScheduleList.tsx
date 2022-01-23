/* eslint-disable react-hooks/exhaustive-deps */
import { Box, Flex } from '@chakra-ui/react'
import dayjs from 'dayjs'
import isBetween from 'dayjs/plugin/isBetween'
import React, { FC, useMemo } from 'react'
import { SubjectType } from '../../lib/types'
import { Pagination } from './Pagination'
import { Subject } from './Subject'
import { setDateList } from './setDateList'
import { setStartAndEnd } from './setStartAndEnd'
import { useSetViewRange } from './useSetViewRange'

type Props = {
  subjects: SubjectType[]
}

export const ScheduleList: FC<Props> = ({ subjects }) => {
  dayjs.extend(isBetween)
  const Day = ['日', '月', '火', '水', '木', '金', '土']

  // subjectsの最初と最後のDayjsオブジェクト
  const { start, end } = useMemo(() => setStartAndEnd(subjects), [subjects])

  // 全体のDayjsオブジェクトの配列
  const dateList = useMemo(() => setDateList(start, end), [start, end])

  // 表示範囲と今何週目を表示しているか
  const { firstViewDate, lastViewDate, currentWeekNum, setCurrentWeekNum } =
    useSetViewRange()

  return (
    <>
      <Box h={170} />
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
            start={start}
            end={end}
            currentWeekNum={currentWeekNum}
            setCurrentWeekNum={setCurrentWeekNum}
          />
        </>
      )}
    </>
  )
}
