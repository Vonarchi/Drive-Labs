import OpenAI from "openai"

const client = new OpenAI({
  apiKey: process.env.OPENAI_API_KEY!,
})

const MODEL = process.env.OPENAI_MODEL || "gpt-4o-mini"

export async function chatComplete(system: string, user: string) {
  const res = await client.chat.completions.create({
    model: MODEL,
    messages: [
      { role: "system", content: system },
      { role: "user", content: user },
    ],
    temperature: 0.2,
  })
  return res.choices[0]?.message?.content || ""
}
