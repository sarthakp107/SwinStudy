import { REGEX_FOR_QNA } from "@/config/Constants";
//Function that turns simple paragraph of QnA to QnAFormat
//The text that needs to be fed should like like (Question: This is the Question Answer: This is the Answer)
//Returns [{question: QUESTION, answer: ANSWER},{question: QUESTION, answer: ANSWER}]
export interface QnAFormat {
    question: string;
    answer: string;
  }

export const QnAConverter = (text: string): QnAFormat[] => {
    const regex = REGEX_FOR_QNA //uses a regex to find patterns (like 'Question:' in a given text)
    let match;
    const qnaArray: QnAFormat[] = []; //Adds them to an array of QnAFormat object
  
    while ((match = regex.exec(text)) !== null) {
      qnaArray.push({
        question: match[1].trim(),
        answer: match[2].trim(),
      });
    }
    return qnaArray; //Returns [{question: QUESTION, answer: ANSWER},{question: QUESTION, answer: ANSWER}]
  };