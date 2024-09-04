import * as React from 'react'
import { Message, useAssistant } from "ai/react";
import { useEffect, useRef } from "react";
import {CreateForm} from './api/actions'

export default function Chat(){
    const { status, messages, input, submitMessage, handleInputChange, error } =
    useAssistant({
      api: "forms/api/",
    });




    return(
        <div className="chat">
            <div className="chat-header">
            <form onSubmit={submitMessage}>
                <input
                //ref={inputRef}
                disabled={status !== "awaiting_message"}
                className="fixed bottom-0 w-full max-w-md p-2 mb-8 border border-gray-300 rounded shadow-xl"
                value={input}
                placeholder="I'm your personal AI therapist tell me your troubles?"
                onChange={handleInputChange}
                />
            </form>
            </div>
        </div>

    
    )
}