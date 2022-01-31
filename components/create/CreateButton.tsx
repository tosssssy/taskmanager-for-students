import { Button } from '@chakra-ui/button'
import { Text } from '@chakra-ui/layout'
import {
  useDisclosure,
  AlertDialog,
  AlertDialogOverlay,
  AlertDialogContent,
  AlertDialogHeader,
  AlertDialogCloseButton,
  AlertDialogBody,
  AlertDialogFooter,
} from '@chakra-ui/react'
import React, { FC, memo } from 'react'

type Props = {
  onclick: () => Promise<void>
}

export const CreateButton: FC<Props> = memo(({ onclick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (
    <>
      <Text my='30px' ml='10%' pr='10%' color='blackAlpha.800' fontSize='sm'>
        ③時間割を確認し、完成ボタンを押して下さい。
      </Text>
      <Button
        minW='70px'
        ml={['10%', '15%']}
        bgGradient='linear(to-l, #7928CA, #FF0080)'
        bgClip='text'
        border='1px'
        borderColor='silver'
        _hover={{
          opacity: 0.8,
        }}
        onClick={onOpen}
      >
        完成
      </Button>
      <AlertDialog
        motionPreset='slideInBottom'
        leastDestructiveRef={cancelRef}
        onClose={onClose}
        isOpen={isOpen}
        isCentered
      >
        <AlertDialogOverlay />

        <AlertDialogContent>
          <AlertDialogHeader>注意</AlertDialogHeader>
          <AlertDialogCloseButton />
          <AlertDialogBody>
            現在のスケジュールが削除されて新しいスケジュールが作成されます。
            よろしいですか？
          </AlertDialogBody>
          <AlertDialogFooter>
            <Button ref={cancelRef} onClick={onClose}>
              いいえ
            </Button>
            <Button colorScheme='red' ml={3} onClick={onclick}>
              はい
            </Button>
          </AlertDialogFooter>
        </AlertDialogContent>
      </AlertDialog>
    </>
  )
})

CreateButton.displayName = 'CreateButton'
