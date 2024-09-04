'use server'

import OpenAI from "openai";
const openai = new OpenAI({
    apiKey:process.env.OPENAI_API_KEY || '',
});


export const runtime = 'edge';

export async function POST(request: Request) {
    // { image: "ASDFASDFASDF base64 string" }
    const { image } = await request.json();
   
    
    const response = await openai.chat.completions.create({
        model: "gpt-4o-mini",
        stream: true,
        max_tokens: 4096, // No max tokens: super short / cut off response.
        messages: [ // GPT-4 with Vision is JUST GPT-4. So you can still talk with it like GPT-4
            // There is no "system" message (THIS MAY CHANGE)
            {
                role: "user",
                //@ts-ignore
                content: [
                    { type: "text", text: "What’s in this image?" },
                    {
                      type: "image_url",
                      image_url: {
                        "url": image,
                        "detail": "high"
                    },
                    },
                ],
            }
        ]
    });

    //const textStream= response.stream  
    const textStream = response.toReadableStream()
    return textStream ;
}