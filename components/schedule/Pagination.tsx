import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Button, Box } from '@chakra-ui/react'
import { FC } from 'react'

type Props = {
  setCurrentWeekNum: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: FC<Props> = ({ setCurrentWeekNum }) => {
  return (
    <Box
      position='fixed'
      bottom={10}
      display='flex'
      justifyContent='center'
      w='full'
      gap={['40px', '60px', '100px', '100px']}
    >
      {/* chakra UIのButtonを使うとbgに違和感があるため */}
      <button onClick={() => setCurrentWeekNum((num) => num - 1)}>
        <ArrowLeftIcon
          p='0'
          zIndex='10'
          h={'40px'}
          w={'40px'}
          color='blue.400'
          _hover={{ opacity: 0.4, transition: '0.3s' }}
        />
      </button>

      <Button
        onClick={() => setCurrentWeekNum(0)}
        colorScheme='blue'
        zIndex='10'
        opacity='0.8'
        _hover={{ opacity: 0.4, transition: '0.3s' }}
      >
        今週
      </Button>

      <button onClick={() => setCurrentWeekNum((num) => num + 1)}>
        <ArrowRightIcon
          p='0'
          zIndex='10'
          h={'40px'}
          w={'40px'}
          color='blue.400'
          _hover={{ opacity: 0.4, transition: '0.3s' }}
        />
      </button>
    </Box>
  )
}
