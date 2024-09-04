import OpenAI from "openai";
import { z } from "zod";
import * as React from 'react'
import { zodResponseFormat } from "openai/helpers/zod";
import {
    createAI,
    createStreamableUI,
    getMutableAIState,
    getAIState,
    streamUI,
    createStreamableValue,
    
  } from 'ai/rsc'
const openai = new OpenAI({
    apiKey:process.env.OPEN_AI_KEY,
});

export async function CreateForm(){

const UI = z.lazy(() =>
  z.object({
    type: z.enum(["div", "button", "header", "section", "field", "form"]),
    label: z.string(),
    //children: z.array({'',''}),
    attributes: z.array(
      z.object({
        name: z.string(),
        value: z.string(),
      })
    ),
  })
);

const completion = await openai.beta.chat.completions.parse({
  model: "gpt-4o-2024-08-06",
  messages: [
    {
      role: "system",
      content: "You are a UI generator AI. Convert the user input into a UI.",
    },
    { role: "user", content: "Make a User Profile Form" },
  ],
  response_format: zodResponseFormat(UI, "ui"),
});

const ui = completion.choices[0].message.parsed;
const textStream = createStreamableValue(ui)

console.log(textStream.value)


}