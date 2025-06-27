import type { NextApiRequest, NextApiResponse } from "next"
import { generateRecipePrompt } from "@/prompt"
import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY,
})

export function extractJsonFromResponse(
  responseText: string
): Record<string, unknown> | null {
  try {
    const cleaned = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim()

    return JSON.parse(cleaned)
  } catch (error) {
    console.error("Ошибка при парсинге ответа LLM:", error)
    return null
  }
}

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse
) {
  if (req.method !== "POST") {
    return res.status(405).json({ error: "Method not allowed" })
  }

  const { filters, userQuery } = req.body

  const prompt = generateRecipePrompt(filters, userQuery)

  try {
    const response = await client.responses.create({
      model: "gpt-4.1-nano",
      input: prompt,
    })

    res.status(200).json(extractJsonFromResponse(response.output_text))
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
