import { GENERATE_FLASHCARD_PROMPT } from "@/config/Constants";
import type { QnAFormat } from "./QnAConverter";

const getBaseUrl = () =>
  import.meta.env.VITE_BACKEND_API_BASE_URL ?? "http://localhost:5288";

/** Upload PDF to backend; backend extracts text, calls LLM, returns flashcards. */
export const uploadPdfAndGetFlashcards = async (file: File): Promise<QnAFormat[]> => {
  const base = getBaseUrl().replace(/\/$/, "");
  const form = new FormData();
  form.append("file", file);
  const res = await fetch(`${base}/api/flashcards/generate`, {
    method: "POST",
    body: form,
    credentials: "include",
  });
  if (!res.ok) {
    const err = await res.text();
    throw new Error(err || "Failed to generate flashcards");
  }
  const data = await res.json();
  const flashcards = data.flashcards ?? [];
  return flashcards.map((f: { question: string; answer: string }) => ({
    question: f.question ?? "",
    answer: f.answer ?? "",
  }));
};

// Legacy: API call to Open Router (used if not using backend generate).
export const FetchQnA = async (text: string, _API: string) => {
  const prompt: string = GENERATE_FLASHCARD_PROMPT
  const authorization = ``
  const response = await fetch('https://openrouter.ai/api/v1/chat/completions', {
    method: "POST",
    headers: {
      "Authorization": authorization,
      "Content-Type": "application/json"
    },
    body: JSON.stringify({

      // "model": import.meta.env.VITE_FETCH_QNA_MODEL,
      "model": "openrouter/free",
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

