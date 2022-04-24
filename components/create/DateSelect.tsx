import { Input } from '@chakra-ui/input'
import { Box, Flex, Text } from '@chakra-ui/layout'
import React, { FC, memo, useState } from 'react'
import { createDateList } from '../../utils/subjectCreate'

type Props = {
  onUpdate: (dateList: Date[]) => void
}

export const DateSelect: FC<Props> = memo(({ onUpdate }) => {
  const [startDate, setStartDate] = useState('')
  return (
    <Box>
      <Flex m={['0px 10%', '0px 15%']} align={'center'} h='40px' maxW='700px'>
        <Input
          type='date'
          bg='white'
          onChange={(e) => setStartDate(e.target.value)}
        />
        <Text fontSize='38px' h='40px' mb='24px' color='blackAlpha.700'>
          ~
        </Text>
        <Input
          type='date'
          bg='white'
          onChange={(e) => onUpdate(createDateList(startDate, e.target.value))}
        />
      </Flex>
    </Box>
  )
})

DateSelect.displayName = 'DateSelect'
