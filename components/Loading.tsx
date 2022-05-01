import { Flex, Spinner } from '@chakra-ui/react'
import React, { FC } from 'react'

export const Loading: FC = () => {
  return (
    <Flex mt='30vh' justifyContent='center'>
      <Spinner thickness='4px' speed='0.65s' emptyColor='gray.200' color='blue.500' size='xl' />
    </Flex>
  )
}
