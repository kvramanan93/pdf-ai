import { OpenAIApi, Configuration } from "openai-edge";

const config = new Configuration({
  apiKey: process.env.OPENAI_API_KEY,
});

const openai = new OpenAIApi(config);

async function delay(ms: number) {
  return new Promise((resolve) => setTimeout(resolve, ms));
}

export async function getEmbeddings(
  text: string,
  retries = 3
): Promise<number[]> {
  try {
    const response = await openai.createEmbedding({
      model: "text-embedding-ada-002",
      input: text.replace(/(\r\n|\n|\r)/gm, " "),
    });

    if (!response.ok) {
      if (response.status === 429 && retries > 0) {
        // Log and retry with exponential backoff
        console.log(
          `Rate limit exceeded, retrying in ${1000 * (4 - retries)} ms...`
        );
        await delay(1000 * (4 - retries)); // Wait with increasing delay
        return getEmbeddings(text, retries - 1);
      }
      throw new Error(
        `OpenAI API error: ${response.status} - ${response.statusText}`
      );
    }

    const result = await response.json();

    if (!result.data || !result.data[0] || !result.data[0].embedding) {
      throw new Error("Unexpected response format from OpenAI API");
    }

    return result.data[0].embedding as number[];
  } catch (error) {
    console.log("Error calling OpenAI API", error);
    throw error;
  }
}