import { REGEX_FOR_QNA } from "@/config/Constants";


export interface QnAFormat {
    question: string;
    answer: string;
  }
  
  export const QnAConverter = (text: string): QnAFormat[] => {
    const regex = REGEX_FOR_QNA
    let match;
    const qnaArray: QnAFormat[] = [];
  
    while ((match = regex.exec(text)) !== null) {
      qnaArray.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      });
    }
    return qnaArray;
  };