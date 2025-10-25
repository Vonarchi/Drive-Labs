import OpenAI from "openai"

const client = new OpenAI({ apiKey: process.env.OPENAI_API_KEY! })

export async function generateTemplate(prompt: string) {
  const sys = "You are a web-app template generator. Return valid React/Next.js component code only."
  const res = await client.chat.completions.create({
    model: process.env.OPENAI_MODEL || "gpt-4o-mini",
    messages: [{ role:"system", content:sys }, { role:"user", content:prompt }],
    temperature:0.3
  })
  return res.choices[0].message?.content ?? ""
}