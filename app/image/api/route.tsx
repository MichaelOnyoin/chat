import { generateText} from 'ai';
import { openai } from '@ai-sdk/openai';


export async function POST(request: Request) {
const { image } = await request.json();
const result = await generateText({
  model: openai('gpt-4o-mini'),
  maxTokens: 812,
  messages: [
    {
      role: 'user',
      content: [
        {
          type: 'text',
          text: 'Whats in this image?',
        },
        {
          type: 'image',
          image: image,
         // image: fs.readFileSync('./node/attachments/eclipse.jpg'),
        },
      ],
    },
  ],
});

//console.log(result.text);

// Return the result as a JSON response
return new Response(JSON.stringify(result.text), {
    headers: {
      'Content-Type': 'application/json',
    },
  });



}

 