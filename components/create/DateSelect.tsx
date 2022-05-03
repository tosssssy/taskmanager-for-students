import { Input } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import React, { FC, memo, useState } from 'react'
import { createDateList } from '../../utils/subjectCreate'

type Props = {
  onUpdate: (dateList: Date[]) => void
}

export const DateSelect: FC<Props> = memo(({ onUpdate }) => {
  const [startDate, setStartDate] = useState('')
  const [endDate, setEndDate] = useState('')
  return (
    <Box>
      <Flex align={'center'} h='40px'>
        <Input
          type='date'
          bg='white'
          onChange={(e) => {
            onUpdate(createDateList(e.target.value, endDate))
            setStartDate(e.target.value)
          }}
        />
        <Text fontSize='38px' h='40px' mb='24px' color='blackAlpha.700'>
          ~
        </Text>
        <Input
          type='date'
          bg='white'
          onChange={(e) => {
            onUpdate(createDateList(startDate, e.target.value))
            setEndDate(e.target.value)
          }}
        />
      </Flex>
    </Box>
  )
})

DateSelect.displayName = 'DateSelect'
