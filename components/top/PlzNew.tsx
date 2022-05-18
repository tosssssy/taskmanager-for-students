import { Box } from '@chakra-ui/layout'
import { FC } from 'react'

export const PlzNew: FC = () => {
  return (
    <Box
      fontSize={'2xl'}
      color={'gray.600'}
      w={'80%'}
      fontWeight={'bold'}
      p={10}
      mt={'30%'}
      mx={'auto'}
      textAlign={'center'}
    >
      新規スケジュールを作成してください
    </Box>
  )
}
