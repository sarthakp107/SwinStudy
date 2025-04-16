export const NUMBER_OF_CURRENT_UNITS = 4;
export const SEMESTER_OPTIONS: string[] = ['Semester 1', 'Semester 2', 'Semester 3', 'Semester 4', 'Semester 5', 'Semester 6', 'Semester 7', 'Semester 8']
export const NUMBER_OF_FLASHCARDS: number[] = [1, 2, 3, 4, 5, 6, 7, 8, 9, 10]
export const LOCATION_OF_PDF_WORKER = '/node_modules/pdfjs-dist/build/pdf.worker.mjs'
// export const OPEN_ROUTER_API ="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"
export const OPEN_ROUTER_API ="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"
export const FETCH_QNA_MODEL = "mistralai/mistral-small-24b-instruct-2501:free"
export const TEST_QnA = "Question: What is the Transformer model based on? Answer: The Transformer model is based solely on attention mechanisms. Question: What are the two main components of neural machine translation? Answer: The two main components of neural machine translation are an encoder and a decoder. Question: What does the encoder do in the Transformer model? Answer: The encoder maps an input sequence of symbol representations to a sequence of continuous representations. Question: What does the decoder do in the Transformer model? Answer: The decoder generates an output sequence of symbols one element at a time. Question: What is the key advantage of the Transformer model over recurrent models? Answer: The Transformer model allows for significantly more parallelization and can reach a new state of the art in translation quality after being trained for as little as twelve hours on eight P100 GPUs.Question: What is the named attention mechanism used in the Transformer? Answer: The named attention mechanism used in the Transformer is Scaled Dot-Product Attention. Question: What is self-attention? Answer: Self-attention is an attention mechanism relating different positions of a single sequence in order to compute a representation of the sequence. Question: What is multi-head attention? Answer: Multi-head attention is an extension of scaled dot-product attention that allows the model to jointly attend to information from different representation subspaces at different positions by linearly projecting the queries, keys and values h times with different, learned linear projections. Question: What is the BLEU score of the Transformer model on the WMT 2014 English-to-German translation task? Answer: The BLEU score of the Transformer model on the WMT 2014 English-to-German translation task is 28.4. Question: What is the key difference between the Transformer and traditional sequence transduction models? Answer: Unlike traditional sequence transduction models, the Transformer does not use recurrence or convolution at all."
export const GENERATE_FLASHCARD_PROMPT = `I have provided some text below. This text is an extract from a study material of a student. The student is trying to prepare for their exam with some flashcards. 
Please create exactly 12 (TWELVE) flashcard-style questions and answers based on this content. Please focus on the key concepts of the study material and generate short and concise Question and relevant Answers. 
Format your response in clear text. Do not use any additional formatting (not even bold or italic, use just plain text).  Label each Question and Answer exactly as "Question: This is a Question." "Answer: This is the Answer" and so on, it shouldn't be a numbered list.`
export const REGEX_FOR_QNA: RegExp = /Question:\s*(.*?)\s*Answer:\s*(.*?)(?=Question:|$)/gs;
