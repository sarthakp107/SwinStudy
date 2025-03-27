import { OPEN_ROUTER_API } from "@/config/Constants";

export const FetchQnA = async (text: string) => {
    const response = await fetch('https://openrouter.ai/api/chat/completions', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPEN_ROUTER_API}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({
            "model": "deepseek/deepseek-r1-zero:free",
            "messages": [
                {
                    "role": "system",
                    "content": "Generate 10 questions and answers based on the provided text. Format it as a plain paragraph, with each Q&A separated by newlines."
                },
                {
                    "role": "user",
                    "content": text
                }
            ]
        })
    });

    const data = await response.json();

    const QnA = data.choices?.[0]?.message?.content?.trim();

    if (!QnA) {
        throw new Error('QnA not found in the response');
    }

    console.log("QnA from Function:", QnA);
    return QnA;
};