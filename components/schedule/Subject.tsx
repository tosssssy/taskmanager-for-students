import {
  Box,
  Button,
  Flex,
  Popover,
  PopoverArrow,
  PopoverBody,
  PopoverCloseButton,
  PopoverContent,
  PopoverFooter,
  PopoverHeader,
  PopoverTrigger,
  Radio,
  RadioGroup,
  Stack,
  Textarea,
  useToast,
} from '@chakra-ui/react'
import React, { memo, useState } from 'react'
import { SubjectType, UpdateSubjectType } from '../../lib/types'

type Props = {
  subject: SubjectType
}

export const Subject: React.FC<Props> = memo(({ subject }) => {
  const toast = useToast()
  const [status, setStatus] = useState(subject.status || 0)
  const [memo, setMemo] = useState(subject.memo || '')
  const color = {
    1: '#d95759',
    2: '#59d957',
    3: 'gray',
  }

  const updateSubject = async () => {
    try {
      const body: UpdateSubjectType = {
        id: subject.id,
        status: status,
        memo: memo,
      }

      await fetch('/api/subject/update', {
        method: 'PUT',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(body),
      })

      toast({
        title: 'セーブしました',
        status: 'success',
        duration: 2000,
        isClosable: true,
      })
    } catch (error) {
      console.error(error)
    }
  }

  return (
    <Flex flexDirection='column' mr={2}>
      <Box color='gray' textAlign='center' fontSize={'sm'} m={1}>
        {subject.period + '限'}
      </Box>
      <Popover placement='bottom' closeOnBlur={true}>
        <PopoverTrigger>
          <Button
            bg={status == 0 ? '#fff' : color[status]}
            color={status == 0 ? 'black.500' : 'white'}
            border='2px'
            borderColor={memo ? 'yellow.400' : 'gray.300'}
            _hover={{ opacity: 0.6 }}
            _active={{ opacity: 0.4 }}
          >
            {subject.name}
          </Button>
        </PopoverTrigger>
        <PopoverContent color='gray' borderColor='blue.800'>
          <PopoverHeader pt={4} fontWeight='bold' border='0'>
            <RadioGroup defaultValue='3'>
              <Stack spacing={5} direction='row'>
                <Radio
                  colorScheme='red'
                  value='1'
                  onChange={() => setStatus(1)}
                >
                  途中
                </Radio>
                <Radio
                  colorScheme='green'
                  value='2'
                  onChange={() => setStatus(2)}
                >
                  提出済み
                </Radio>
                <Radio
                  colorScheme='gray'
                  value='3'
                  onChange={() => setStatus(3)}
                >
                  無し
                </Radio>
              </Stack>
            </RadioGroup>
          </PopoverHeader>
          <PopoverArrow />
          <PopoverCloseButton />

          <PopoverBody>
            <Textarea
              value={memo}
              placeholder='メモを追加'
              onChange={(e) => setMemo(e.target.value)}
            />
          </PopoverBody>
          <PopoverFooter border='0' d='flex' justifyContent='flex-end' pb={4}>
            <Button size='sm' colorScheme='blue' onClick={updateSubject}>
              Save
            </Button>
          </PopoverFooter>
        </PopoverContent>
      </Popover>
    </Flex>
  )
})

// Component definition is missing display name のESLintエラー回避
Subject.displayName = 'Subject'
