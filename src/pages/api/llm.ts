import type { NextApiRequest, NextApiResponse } from "next"
import { generateRecipePrompt } from "@/prompt"

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
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer ${process.env.LLM_API_KEY}`,
          "Content-Type": "application/json",
          "HTTP-Referer": "https://cook-mate-cyan.vercel.app/",
          "X-Title": "CookMate",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct-2506",
          messages: [{ role: "user", content: prompt }],
        }),
      }
    )

    if (!response.ok) {
      const error = await response.text()
      return res.status(500).json({ error })
    }

    const data = await response.json()
    res
      .status(200)
      .json(extractJsonFromResponse(data.choices[0].message.content))
  } catch (err) {
    res.status(500).json({ error: (err as Error).message })
  }
}
