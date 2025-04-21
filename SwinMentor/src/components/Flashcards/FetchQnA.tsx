import { GENERATE_FLASHCARD_PROMPT } from "@/config/Constants";

//API Call to a model in Open Router. Responds with a paragraph of question/answer pair
export const FetchQnA = async (text: string) => {
    const prompt: string = GENERATE_FLASHCARD_PROMPT
    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
        method: "POST",
        headers: {
            "Authorization": `Bearer ${import.meta.env.OPEN_ROUTER_API}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            "model": import.meta.env.FETCH_QNA_MODEL,
            "messages": [
                {
                    "role": "system",
                    "content": prompt
                },
                {
                    "role": "user",
                    "content": text
                }
            ]
        })
    });
    const data = await response.json();
    let QnA = data.choices?.[0]?.message?.content?.trim(); //The actual prompt answer is within Data -> Choices[0] -> Message -> Content
    if (!QnA) {
        throw new Error('QnA not found in the response');
    }
    return QnA
};

