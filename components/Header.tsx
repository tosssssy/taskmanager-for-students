import { Button } from '@chakra-ui/button'
import { Box, Flex, Heading, Text } from '@chakra-ui/layout'
import { signOut, useSession } from 'next-auth/client'
import Link from 'next/link'
import { useRouter } from 'next/router'
import React, { FC } from 'react'

type Props = {
  rightButtonName?: string
  rightButtonPath?: string
}

export const Header: FC<Props> = ({ rightButtonName = '', rightButtonPath = '' }) => {
  const router = useRouter()
  const isActive: (pathname: string) => boolean = (pathname) => router.pathname === pathname
  const [session] = useSession()

  return (
    <Flex justify='space-between' alignItems={'center'} m={5}>
      <Heading
        as='h1'
        p={2}
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        fontSize='4xl'
      >
        <Link href='/schedule'>Task Manager</Link>
      </Heading>

      {session ? (
        <Flex direction='column'>
          <Text>user：{session?.user?.name || ''}</Text>
          <Flex mt={3} direction='column' gap='2' justify={'end'}>
            <Link href={rightButtonPath} passHref>
              <Button
                as='a'
                w='120px'
                size='sm'
                bgGradient='linear(to-l, #7928CA, #FF0080)'
                _hover={{
                  bgGradient: 'linear(to-r, #7928CA, #FF0080)',
                }}
                color={'white'}
                shadow={'base'}
              >
                {rightButtonName}
              </Button>
            </Link>
            <Button w='120px' size='sm' shadow={'base'} onClick={() => signOut()}>
              Log out
            </Button>
          </Flex>
        </Flex>
      ) : (
        <Link href='/api/auth/signin' passHref>
          <Box
            data-active={isActive('/signup')}
            as='button'
            p='10px 20px'
            color='white'
            fontWeight='bold'
            borderRadius='md'
            bgGradient='linear(to-l, #7928CA, #FF0080)'
            _hover={{
              bgGradient: 'linear(to-r, #7928CA, #FF0080)',
            }}
          >
            Log in
          </Box>
        </Link>
      )}
    </Flex>
  )
}
