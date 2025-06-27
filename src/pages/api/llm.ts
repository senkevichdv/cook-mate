import type { NextApiRequest, NextApiResponse } from 'next';
import { generateRecipePrompt } from '../../prompt';

// eslint-disable-next-line @typescript-eslint/no-explicit-any
export function extractJsonFromResponse(responseText: string): any | null {
  try {
    // 1. Убираем блоки ```json ... ``` или ``` ...
    const cleaned = responseText
      .replace(/```json/gi, "")
      .replace(/```/g, "")
      .trim();

    // 2. Пробуем парсить
    return JSON.parse(cleaned);
  } catch (error) {
    console.error("Ошибка при парсинге ответа LLM:", error);
    return null;
  }
}

export default async function handler(req: NextApiRequest, res: NextApiResponse) {
  if (req.method !== 'POST') {
    return res.status(405).json({ error: 'Method not allowed' });
  }

  const { filters } = req.body; // messages: [{role: 'user'|'assistant', content: string}, ...]

  // if (!messages) {
  //   return res.status(400).json({ error: 'Missing messages' });
  // }

  const prompt = generateRecipePrompt(filters);

  // const apiKey = process.env.OPENROUTER_API_KEY;
  // if (!apiKey) {
  //   return res.status(500).json({ error: 'Missing OpenRouter API key' });
  // }

  try {
    const response = await fetch(
      "https://openrouter.ai/api/v1/chat/completions",
      {
        method: "POST",
        headers: {
          Authorization: `Bearer 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`,
          "Content-Type": "application/json",
          "HTTP-Referer": "http://localhost:3000", // or your domain
          "X-Title": "CookMate",
        },
        body: JSON.stringify({
          model: "mistralai/mistral-small-3.2-24b-instruct-2506", // Free model
          messages: [{ role: "user", content: prompt }],
        }),
      }
    );

    if (!response.ok) {
      const error = await response.text();
      return res.status(500).json({ error });
    }

    const data = await response.json();
    res.status(200).json(extractJsonFromResponse(data.choices[0].message.content));
  } catch (err) {
    res.status(500).json({ error: (err as Error).message });
  }
} 