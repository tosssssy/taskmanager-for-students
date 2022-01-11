import { Box, StackDivider, VStack } from '@chakra-ui/layout'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'

export const Welcome: FC = () => {
  return (
    <Box bg={'white'}>
      <Box h={50} bg={'white'} />
      <Flex
        maxW={'container.xl'}
        minW={'58rem'}
        px={10}
        mx={'auto'}
        my={100}
        alignItems={'center'}
        justifyContent={'flex-end'}
      >
        <Heading as='h1' fontSize={'3rem'} m={'auto'} color={'blackAlpha.700'}>
          <Text>大学生のための</Text>
          <Text>シンプルな</Text>
          <Text>課題管理アプリ</Text>
        </Heading>
        <Image
          maxW={'60%'}
          src='/undraw_progressive_app_m9ms.png'
          alt='main image'
        />
      </Flex>
      <VStack
        divider={<StackDivider borderColor='gray.200' />}
        spacing={10}
        align='stretch'
        bg={'blue.400'}
        p={100}
      >
        <Box>
          <Heading as='h2' color={'white'} fontSize={'5xl'}>
            Usage
          </Heading>
        </Box>
        <Box color={'white'} fontSize={'3xl'} ml={10}>
          1. サインアップまたはログイン
        </Box>
        <Box color={'white'} fontSize={'3xl'} ml={10}>
          2. スケジュールを新規作成
        </Box>
        <Box color={'white'} fontSize={'3xl'} ml={10}>
          3. 作成したスケジュールで課題管理！
        </Box>
      </VStack>
    </Box>
  )
}
