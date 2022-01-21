import { Box } from '@chakra-ui/layout'
import { FC } from 'react'

export const PlzNew: FC = () => {
  return (
    <Box
      fontSize={'5xl'}
      color={'gray.600'}
      w={'80%'}
      fontWeight={'bold'}
      p={10}
      pt={300}
      mx={'auto'}
      textAlign={'center'}
    >
      新規スケジュールを作成してください
    </Box>
  )
}
