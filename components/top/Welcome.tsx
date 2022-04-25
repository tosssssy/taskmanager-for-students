import { Box, StackDivider, VStack } from '@chakra-ui/layout'
import { Flex, Heading, Image, Text } from '@chakra-ui/react'
import { FC } from 'react'

export const Welcome: FC = () => {
  return (
    <Box>
      <Flex
        maxW={'container.xl'}
        px={10}
        mx={'auto'}
        my={100}
        alignItems={'center'}
        justifyContent={'flex-end'}
        wrap={'wrap'}
        gap={20}
      >
        <Heading
          as='h1'
          fontSize={['2rem', '2rem', '2rem', '2.5rem', '3rem']}
          m={'auto'}
          color={'blackAlpha.700'}
          textAlign={'center'}
        >
          <Text>大学生のための</Text>
          <Text>シンプルな</Text>
          <Text>課題管理アプリ</Text>
        </Heading>
        <Image
          // maxW={'60%'}
          rounded={'3xl'}
          shadow={'xl'}
          minW={300}
          w={500}
          mx={'auto'}
          src='/undraw_progressive_app_m9ms.png'
          alt='main image'
        />
      </Flex>
      <Box bg={'blue.400'}>
        <VStack
          maxW={'container.lg'}
          divider={<StackDivider borderColor='gray.200' />}
          spacing={10}
          align='stretch'
          mx={'auto'}
          py={100}
          px={30}
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
    </Box>
  )
}
