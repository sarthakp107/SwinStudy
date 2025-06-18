# #This is the code used in AI-Server VM in GCP

# from fastapi import FastAPI
# from fastapi.middleware.cors import CORSMiddleware
# from pydantic import BaseModel
# from transformers import AutoModelForCausalLM, AutoTokenizer
# import torch

# app = FastAPI()


# app.add_middleware(
#     CORSMiddleware,
#     allow_origins=["*"],  
#     allow_credentials=True,
#     allow_methods=["*"],
#     allow_headers=["*"], 
# )


# class FlashcardRequest(BaseModel):
#     text: str

# # Load Model and Tokenizer
# MODEL_PATH = "/home/thechiragluitel/models/mistral"
# tokenizer = AutoTokenizer.from_pretrained(MODEL_PATH)
# model = AutoModelForCausalLM.from_pretrained(MODEL_PATH, torch_dtype=torch.float16, device_map="auto")

# @app.post("/flashcards")
# async def generate_qna(request: FlashcardRequest):
#     prompt = f"Task: Generate 10 Q&A pairs from the provided text.\n\nText:\n{request.text}\n\nQ&A:"
    
#     inputs = tokenizer(prompt, return_tensors="pt").to("cuda" if torch.cuda.is_available() else "cpu")
#     output = model.generate(**inputs, max_length=1024, temperature=0.7)
#     qna_text = tokenizer.decode(output[0], skip_special_tokens=True)

#     return {"qna": qna_text.strip()} 