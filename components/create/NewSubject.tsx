import { Box, Flex } from '@chakra-ui/layout'
import React from 'react'
import { NewSubjectType } from '../../lib/types'

type Props = {
  subject: NewSubjectType
  deleteSubject: any
}

export const NewSubject: React.FC<Props> = ({ subject, deleteSubject }) => {
  const { name, period, day } = subject

  return (
    <>
      <Flex
        w='300px'
        m='10px 0'
        borderRadius='10px'
        bg='red.50'
        ml={['10%', '15%']}
      >
        <Box fontSize='18px' p='10px 0' w='38px' ml='20px'>
          {day}
        </Box>
        <Box fontSize='18px' p='10px 0' w='15px' ml='20px'>
          {period}
        </Box>
        <Box fontSize='18px' p='10px 0' ml='20px' w='160px'>
          {name}
        </Box>
        <Box
          fontSize='150%'
          display='inline'
          p='0'
          m='auto 10px 10px auto'
          onClick={deleteSubject}
          _hover={{
            cursor: 'pointer',
            color: 'orange',
          }}
        >
          ×
        </Box>
      </Flex>
    </>
  )
}
