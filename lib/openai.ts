import OpenAI from "openai";

const apiKey = process.env.OPENAI_API_KEY;

if (!apiKey) {
  throw new Error("OPENAI_API_KEY is not set");
}

const openai = new OpenAI({
  apiKey: apiKey,
  organization: 'org-33yCEHBMNv6RuyrlV2PDFajJ'
});


export async function getEmbeddings(text: string) {
  const response = await openai.embeddings.create({
    model: "text-embedding-ada-002",
    input: text,
  });

  const embedding = response.data[0].embedding;

  if (!embedding) {
    throw new Error("No embedding found");
  }

  return embedding;
}

export async function getEmbeddingForNote(title: string, content?: string ) {
  return getEmbeddings(`Title: ${title}\nContent: ${content}`);
}

export default openai;

