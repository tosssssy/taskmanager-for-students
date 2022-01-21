import { Box, Spinner } from '@chakra-ui/react'
import React, { FC } from 'react'

export const Loading: FC = () => {
  return (
    <Box display='flex' pt='50Vh' justifyContent='center'>
      <Spinner
        thickness='4px'
        speed='0.65s'
        emptyColor='gray.200'
        color='blue.500'
        size='xl'
      />
    </Box>
  )
}
