import { Box, Flex } from '@chakra-ui/layout'
import { chakra } from '@chakra-ui/react'
import React, { memo } from 'react'
import { NewSubjectType } from '../../types/subject'

type Props = {
  subject: NewSubjectType
  onDelete: () => void
}

export const NewSubject: React.FC<Props> = memo(({ subject, onDelete }) => {
  const { name, period, day } = subject

  return (
    <Flex w='300px' borderRadius='10px' bg='red.50'>
      <Box fontSize='18px' p='10px 0' w='38px' ml='20px'>
        {day}
      </Box>
      <Box fontSize='18px' p='10px 0' w='15px' ml='20px'>
        {period}
      </Box>
      <Box fontSize='18px' p='10px 0' ml='20px' w='160px'>
        {name}
      </Box>
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
