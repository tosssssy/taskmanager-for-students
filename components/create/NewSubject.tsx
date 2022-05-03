import { Flex } from '@chakra-ui/layout'
import { chakra, Text } from '@chakra-ui/react'
import React, { memo } from 'react'
import { NewSubjectType } from '../../types/subject'

const DayName = { Sun: '日', Mon: '月', Tue: '火', Wed: '水', Thu: '木', Fri: '金', Sat: '土' }

type Props = {
  subject: NewSubjectType
  onDelete: () => void
}

export const NewSubject: React.FC<Props> = memo(({ subject, onDelete }) => {
  const { name, period, day: dayString } = subject
  const day = dayString as keyof typeof DayName

  return (
    <Flex w='300px' borderRadius='10px' bg='white' color={'grey'} shadow={'md'}>
      <Text fontSize='18px' p='10px 0' w='40px' ml='15px'>
        {DayName[day]}曜
      </Text>
      <Text fontSize='18px' p='10px 0' w='35px' ml='20px'>
        {period}限
      </Text>
      <Text fontSize='18px' p='10px 0' ml='20px' w='160px'>
        {name}
      </Text>
      <chakra.button
        fontSize='150%'
        display='inline'
        m='auto 10px 10px auto'
        onClick={onDelete}
        _hover={{
          cursor: 'pointer',
          color: 'orange',
        }}
      >
        ×
      </chakra.button>
    </Flex>
  )
})

NewSubject.displayName = 'NewSubject'
