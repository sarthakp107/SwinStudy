
import { OPEN_ROUTER_API, FETCH_QNA_MODEL } from "@/config/Constants";


export const FetchQnA = async (text: string, number: number) => {
    const prompt: string = `I have provided some text below. This text is an extract from a study material of a student. The student is trying to prepare for their exam with some flashcards. 
                            Please create exactly ${number} flashcard-style questions and answers based on this content. Please focus on the key concepts of the study material and generate short and concise Question and relevant Answers. 
                            Format your response in clear text. Do not use any additional formatting (not even bold or italic, use just plain text).  Label each Question and Answer like Question: This is a Question. Answer: This is the answer, and so on, it shouldn't be a numbered list.`

    const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {

        method: "POST",
        headers: {
            "Authorization": `Bearer ${OPEN_ROUTER_API}`,
            "Content-Type": "application/json"
        },
        body: JSON.stringify({

            "model": FETCH_QNA_MODEL,
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
    console.log("Raw Response:", response)
    console.log("Raw Data:", data)
    let QnA = data.choices?.[0]?.message?.content?.trim();
    console.log("Uncleaned QnA", QnA)
    if (!QnA) {
        throw new Error('QnA not found in the response');
    }
    return QnA


};

