import { cohere } from '@ai-sdk/cohere';
import { streamText, UIMessage, convertToModelMessages } from 'ai'; // 添加此行

//allow streaming responses up to 30 seconds
export const maxDuration = 30;

export async function POST(req: Request) {
  const { messages }: { messages: UIMessage[] } = await req.json();

  const result = streamText({
    model: cohere('command-light'),
    system: 'You are a helpful assistant.',
    messages: convertToModelMessages(messages),
  });

  return result.toUIMessageStreamResponse();
}