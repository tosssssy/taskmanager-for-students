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
  Box,
} from '@chakra-ui/react'
import React, { FC, memo, useRef } from 'react'

type Props = {
  onclick: () => void
}

export const CreateButton: FC<Props> = memo(({ onclick }) => {
  const { isOpen, onOpen, onClose } = useDisclosure()
  const cancelRef = useRef(null)
  return (
    <>
      <Box textAlign={'right'}>
        <Button
          p='10px 20px'
          color='white'
          fontWeight='bold'
          borderRadius='md'
          bgGradient='linear(to-l, #7928CA, #FF0080)'
          _hover={{
            opacity: 0.6,
          }}
          onClick={onOpen}
        >
          完成
        </Button>
      </Box>

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
            現在のスケジュールが削除されて新しいスケジュールが作成されます。 よろしいですか？
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
