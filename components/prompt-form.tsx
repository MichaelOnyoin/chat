'use client'

import * as React from 'react'
import Textarea from 'react-textarea-autosize'

import { useActions, useUIState } from 'ai/rsc'
import { ChangeEvent, useState, FormEvent } from "react"
import { UserMessage } from './stocks/message'
import { type AI } from '@/lib/chat/actions'
import { Button } from '@/components/ui/button'
import { IconArrowElbow, IconPlus, IconUpload } from '@/components/ui/icons'
import {
  Tooltip,
  TooltipContent,
  TooltipTrigger
} from '@/components/ui/tooltip'
import { useEnterSubmit } from '@/lib/hooks/use-enter-submit'
import { nanoid } from 'nanoid'
import { useRouter } from 'next/navigation'
import  ImageUpload  from './image'

export function PromptForm({
  input,
  setInput
}: {
  input: string
  setInput: (value: string) => void
}) {
  const router = useRouter()
  const { formRef, onKeyDown } = useEnterSubmit()
  const inputRef = React.useRef<HTMLTextAreaElement>(null)
  const { submitUserMessage } = useActions()
  const [_, setMessages] = useUIState<typeof AI>()

  React.useEffect(() => {
    if (inputRef.current) {
      inputRef.current.focus()
    }
  }, [])

  return (
    <form
      
      ref={formRef}
      onSubmit={async (e: any) => {
        e.preventDefault()

        // Blur focus on mobile
        if (window.innerWidth < 600) {
          e.target['message']?.blur()
        }

        const value = input.trim()
        setInput('')
        if (!value) return

        // Optimistically add user message UI
        setMessages(currentMessages => [
          ...currentMessages,
          {
            id: nanoid(),
            display: <UserMessage>{value}</UserMessage>
          }
        ])

        // Submit and get response message
        const responseMessage = await submitUserMessage(value)
        setMessages(currentMessages => [...currentMessages, responseMessage])
      }}
    >
      <div className="relative flex max-h-60 w-full grow flex-col overflow-hidden bg-background px-8 sm:rounded-md sm:border sm:px-12">
        <Tooltip>
          <TooltipTrigger asChild>
            <Button
              variant="outline"
              size="icon"
              className="absolute left-0 top-[14px] size-8 rounded-full bg-background p-0 sm:left-4"
              onClick={() => {
                router.push('/new')
              }}
            >
              <IconPlus />
              <span className="sr-only">New Chat</span>
            </Button>
          </TooltipTrigger>
          <TooltipContent>New Chat</TooltipContent>
        </Tooltip>
        <Textarea
          ref={inputRef}
          tabIndex={0}
          onKeyDown={onKeyDown}
          placeholder="Send a message."
          className="min-h-[60px] w-full resize-none bg-transparent px-4 py-[1.3rem] focus-within:outline-none sm:text-sm rounded-lg"
          autoFocus
          spellCheck={false}
          autoComplete="off"
          autoCorrect="off"
          name="message"
          rows={3}
          value={input}
          onChange={e => setInput(e.target.value)}
          style={{borderRadius:50}}
        />
        <div className="absolute right-0 top-[13px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild>
              <Button type="submit" size="icon" disabled={input === ''}>
                <IconArrowElbow />
                <span className="sr-only">Send message</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>Send message</TooltipContent>
          </Tooltip>
        </div>
        <div className="absolute right top-[13px] left-[512px] sm:right-4">
          <Tooltip>
            <TooltipTrigger asChild> 
              <Button type="submit" size="icon" disabled={input === ''}>
                <IconUpload />
                
                <span className="sr-only"> Upload file</span>
              </Button>
            </TooltipTrigger>
            <TooltipContent>
            {/* <div className='flex flex-col mb-6'>
            <label className='mb-2 text-sm font-medium'>Upload Image</label>
            <input
              type='image'
              className="text-sm border rounded-lg cursor-pointer"
              onChange={(e) => handleFileChange(e)}
            />
            </div> */}
            <ImageUpload/>
            </TooltipContent>
          </Tooltip>
          
        </div>
      </div>
    </form>
  )
}

function handleFileChange(event: ChangeEvent<HTMLInputElement>) {
  if(event.target.files === null) {
    window.alert("No file selected. Choose a file.")
    return;
  }
  const file = event.target.files[0];

  // Convert the users file (locally on their computer) to a base64 string
  // FileReader
  const reader = new FileReader();
  reader.readAsDataURL(file);

  reader.onload = () => {
    // reader.result -> base64 string ("ENTIRESTRING" -> :))
    if(typeof reader.result === "string") {
      console.log(reader.result);
      //set(reader.result);
    }
  }

  reader.onerror = (error) => {
    console.log("error: " + error);
  }

}