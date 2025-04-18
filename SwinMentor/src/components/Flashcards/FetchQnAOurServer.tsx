//API Call to a model in Our Server, currently hosting DeepSeek. Responds with a paragraph of question/answer pair
export const FetchQnAOurServer = async (text: string) => {
    const response = await fetch('http://34.129.0.139:8000/generate', {
        method: "POST",
        headers: {
            "Content-Type": "application/json"
        },
        body: JSON.stringify({ text }) // Send text in JSON format
    });
    if (!response.ok) {
        throw new Error(`Server error: ${response.status} - ${await response.text()}`);
    }
    const data = await response.json();
    const QnA = data.qna?.trim();
    if (!QnA) {
        throw new Error('QnA not found in the response');
    }
    return QnA;
};