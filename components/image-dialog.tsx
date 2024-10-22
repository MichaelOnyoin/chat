'use client'

import * as React from 'react'
import { type DialogProps } from '@radix-ui/react-dialog'
import { toast } from 'sonner'

import { ServerActionResult, type Chat } from '@/lib/types'
import { Button } from '@/components/ui/button'
import {
  Dialog,
  DialogContent,
  DialogDescription,
  DialogFooter,
  DialogHeader,
  DialogTitle
} from '@/components/ui/dialog'
import { IconSpinner } from '@/components/ui/icons'
import { useCopyToClipboard } from '@/lib/hooks/use-copy-to-clipboard'

interface ImageDialogProps extends DialogProps {
//   chat: Pick<Chat, 'id' | 'title' | 'messages'>
//   ImageChat: (id: string) => ServerActionResult<Chat>
//   onCopy: () => void
}

export function ImageDialog({
//   chat,
//   ImageChat,
//   onCopy,
  ...props
}: ImageDialogProps) {
  const { copyToClipboard } = useCopyToClipboard({ timeout: 1000 })
  const [isImagePending, startImageTransition] = React.useTransition()

  

  return (
    <Dialog {...props}>
      <DialogContent>
        <DialogHeader>
          <DialogTitle>Image link to chat</DialogTitle>
          <DialogDescription>
            Anyone with the URL will be able to view the Imaged chat.
          </DialogDescription>
        </DialogHeader>
        
        <DialogFooter className="items-center">
          <Button>
            {isImagePending ? (
              <>
                <IconSpinner className="mr-2 animate-spin" />
                Copying...
              </>
            ) : (
              <>Copy link</>
            )}
          </Button>
        </DialogFooter>
      </DialogContent>
    </Dialog>
  )
}
