import { ArrowLeftIcon, ArrowRightIcon } from '@chakra-ui/icons'
import { Button, Box } from '@chakra-ui/react'
import { Dayjs } from 'dayjs'
import { FC } from 'react'

type Props = {
  startDate: Dayjs
  endDate: Dayjs
  firstViewDate: Dayjs
  lastViewDate: Dayjs
  currentWeekNum: number
  setCurrentWeekNum: React.Dispatch<React.SetStateAction<number>>
}

export const Pagination: FC<Props> = ({
  startDate,
  endDate,
  firstViewDate,
  lastViewDate,
  currentWeekNum,
  setCurrentWeekNum,
}) => {
  return (
    <Box>
      {startDate <= firstViewDate && (
        <button onClick={() => setCurrentWeekNum(currentWeekNum - 1)}>
          <ArrowLeftIcon
            position='fixed'
            top='90%'
            left={['10%', '20%', '25%', '38%', '42%']}
            zIndex='10'
            fontSize='50px'
            color='blue.400'
            opacity='0.8'
            _hover={{ opacity: 0.4, transition: '0.5s' }}
            _active={{ opacity: 0.2, color: 'red' }}
          />
        </button>
      )}
      <Box onClick={() => setCurrentWeekNum(0)}>
        <Button
          colorScheme='blue'
          position='fixed'
          top='91%'
          left={['43%', '45%', '48%', '48%', '48%']}
          zIndex='10'
          opacity='0.8'
          _hover={{ opacity: 0.4, transition: '0.5s' }}
          _active={{ opacity: 0.2, bg: 'red' }}
        >
          今週
        </Button>
      </Box>
      {endDate >= lastViewDate && (
        <button onClick={() => setCurrentWeekNum(currentWeekNum + 1)}>
          <ArrowRightIcon
            position='fixed'
            top='90%'
            left={['80%', '70%', '69%', '58%', '55%']}
            zIndex='10'
            fontSize='50px'
            color='blue.400'
            opacity='0.8'
            _hover={{ opacity: 0.4, transition: '0.5s' }}
            _active={{ opacity: 0.2, color: 'red' }}
          />
        </button>
      )}
    </Box>
  )
}
