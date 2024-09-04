'use server'
import { streamText} from "ai"
import {
    
    useUIState,
    streamUI,
    createStreamableValue,
    
  } from 'ai/rsc'
  
import { SpinnerMessage, UserMessage } from '@/components/stocks/message'

import { openai } from "@ai-sdk/openai";
import type { AI } from '@/lib/chat/actions'


export const runtime = 'edge';
//  const openai = new OpenAI({
//          apiKey: process.env.OPENAI_API_KEY || "",
//        });

// Route Handlers let us create API logic
// POST api/analyzeImage
export async function POST(request: Request) {
    // { image: "ASDFASDFASDF base64 string" }
    const { image } = await request.json();
    //const systemMessage = createStreamableUI(null)
    const [, setMessages] = useUIState<typeof AI>()
    
    const response = await streamUI({
        model: openai("gpt-4o-mini"),
        initial:'Image',
        prompt: 'Whats in this image',
        //stream: true,
        //max_tokens: 4096, // No max tokens: super short / cut off response.
        messages: [ // GPT-4 with Vision is JUST GPT-4. So you can still talk with it like GPT-4
            // There is no "system" message (THIS MAY CHANGE)
            {
                role: "user",
                //@ts-ignore
                content: [
                    { type: image, text: "What's in this image?" },
                    
                ]
            }
        ]
    });

    const textStream= response.stream  

    //const stream = response:RenderResult;
    //let textStream: undefined | ReturnType<typeof createStreamableValue<string>>
    //return new StreamingTextResponse(stream);
    return textStream ;
}