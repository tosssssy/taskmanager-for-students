import { Button } from '@chakra-ui/button'
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
  onclick: () => void
}

export const CreateButton: FC<Props> = memo(({ onclick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = React.useRef()
  return (
    <>
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
