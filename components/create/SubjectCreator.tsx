import { AddIcon } from '@chakra-ui/icons'
import { Flex, chakra, Input, Button, Text } from '@chakra-ui/react'
import { useSession } from 'next-auth/client'
import React, { FC, memo, useState } from 'react'
import { NewSubjectType } from '../../types/subject'
import { NewSubject } from './NewSubject'

type Props = {
  newSubjectList: NewSubjectType[]
  onAdd: (newSubject: NewSubjectType) => void
  onDelete: (index: number) => void
}

export const SubjectCreator: FC<Props> = memo(({ newSubjectList, onAdd, onDelete }) => {
  const [session] = useSession()
  const [day, setDay] = useState('Sun')
  const [period, setPeriod] = useState(1)
  const [name, setName] = useState('')
  const date: Date = new Date() //後ほど書き換えられるのでここは仮の代入

  return (
    <>
      <Flex>
        <chakra.select
          minW='50px'
          border='rgb(226,232,240) 2px solid'
          _focus={{
            border: 'rgb(130,179,225) 2px solid',
          }}
          borderRadius='5px'
          onChange={(e) => setDay(e.target.value)}
        >
          <option value='Sun'>日</option>
          <option value='Mon'>月</option>
          <option value='Tue'>火</option>
          <option value='Wed'>水</option>
          <option value='Thu'>木</option>
          <option value='Fri'>金</option>
          <option value='Sat'>土</option>
        </chakra.select>
        <chakra.select
          minW='50px'
          border='rgb(226,232,240) 2px solid'
          _focus={{
            border: 'rgb(130,179,225) 2px solid',
          }}
          borderRadius='5px'
          onChange={(e) => setPeriod(Number(e.target.value))}
        >
          <option value='1'>1</option>
          <option value='2'>2</option>
          <option value='3'>3</option>
          <option value='4'>4</option>
          <option value='5'>5</option>
          <option value='6'>6</option>
        </chakra.select>
        <Input
          placeholder='例）数学'
          bg={'white'}
          maxLength={20}
          onChange={(e) => setName(e.target.value)}
        />
        <Button
          minW='70px'
          bg='white'
          rightIcon={<AddIcon />}
          colorScheme='blue'
          variant='outline'
          _hover={{ bg: 'blue.500', color: 'white' }}
          onClick={() =>
            onAdd({
              name,
              date,
              period,
              day,
              authorId: Number(session?.id),
            })
          }
          disabled={!name || !period || !day || newSubjectList.length > 20}
        >
          追加
        </Button>
      </Flex>

      {newSubjectList.length > 20 && <Text color='red.500'>20科目を超える登録はできません</Text>}

      <Flex direction='column' gap='10px' mt='10px'>
        {newSubjectList.map((subject, index) => {
          return <NewSubject key={index} subject={subject} onDelete={() => onDelete(index)} />
        })}
      </Flex>
    </>
  )
})

SubjectCreator.displayName = 'SubjectCreator'
