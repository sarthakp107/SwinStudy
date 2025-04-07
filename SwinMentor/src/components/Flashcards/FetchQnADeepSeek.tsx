import OpenAI from "openai";
//API Call to DeepSeek. Responds with a paragraph of question/answer pair.
const openai = new OpenAI({
        baseURL: 'https://api.deepseek.com',
        apiKey: 'sk-4d5838169a164e10bd0fa32aac0a95fb',
        dangerouslyAllowBrowser: true
});

async function FetchQnADeepSeek(text: string) {
  const completion = await openai.chat.completions.create({
    messages: [
        { role: "system", content: "You are a helpful assistant." },
        { role:"user", content: text}
    ],
    model: "deepseek-chat",
  });
const data = completion.choices[0].message.content
  console.log(data);
  return data
}

export default FetchQnADeepSeek

