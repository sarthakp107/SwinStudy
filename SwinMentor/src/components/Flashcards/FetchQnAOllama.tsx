//API Call to a model in Ollama(hosted in Local Server for Testing). Responds with a paragraph of question/answer pair
export const FetchQnAOllama = async (text: string)=>{
    const response = await fetch ("http://localhost:11434/api/generate/", {
        method: "POST",
        headers: {
            "content-type": "application/json"
        },
        body: JSON.stringify({
            "model":"gemma3:1b",
            "prompt": {text}
        })
    })
    const data = await response.json()
    console.log(data)
    return data;

}