import { CoreMessage, streamText } from "ai";
import { openai } from "@ai-sdk/openai";

export const runtime = "edge"; //To make this function run faster when deployed to versel


export async function POST(req: Request) {
  const { messages }: { messages: CoreMessage[] } = await req.json();
  /*const response = await openai.createChatCompletion({
            model: 'gpt-3.5-turbo',
            messages,
            stream:true
        })*/
  const result = await streamText({
    model: openai("gpt-3.5-turbo"),
    messages,
  });

  return result.toDataStreamResponse();
}
