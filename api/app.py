
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForCausalLM, T5ForConditionalGeneration,T5Tokenizer
import torch

# Load fine-tuned model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")

gpt_model_id = "joshisarita1311/smart-compose-model"
gpt_tokenizer = AutoTokenizer.from_pretrained(gpt_model_id)
gpt_model = AutoModelForCausalLM.from_pretrained(gpt_model_id)
gpt_model = gpt_model.to(device)
gpt_model.eval()

# t5_model_id = "C:/Users/Admin/OneDrive/Documents/Repos/GPT2-inline-text-auto-completion/model/t5/fine-tuned-20250603_222639"
# t5_tokenizer = T5Tokenizer.from_pretrained(t5_model_id)
# t5_model = T5ForConditionalGeneration.from_pretrained(t5_model_id).to(device)
# t5_model = t5_model.to(device)
# t5_model.eval()

app = FastAPI()

# CORS for frontend
app.add_middleware(
    CORSMiddleware,
    allow_origins=["*"],
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

@app.get("/")
def test():
    return {"status": "running"}

@app.get("/health")
def test():
    return {"status": "running"}

def gpt2_autocomplete(prompt: str) -> str:
    inputs = gpt_tokenizer(prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = gpt_model.generate(
            inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            pad_token_id=gpt_tokenizer.eos_token_id,
            max_new_tokens=5,
            do_sample=False,         
            top_k=30,
            top_p=0.9,
            temperature=0.5,
            repetition_penalty=1.1
        )

    full_text =  gpt_tokenizer.decode(outputs[0], skip_special_tokens=True)
    return full_text[len(prompt):].strip()

# def t5_autocomplete(prompt: str) -> str:
#     input_ids = t5_tokenizer.encode(prompt, return_tensors="pt", truncation=True).to(device)

#     # Generate suggestion
#     with torch.no_grad():
#         outputs = t5_model.generate(
#             input_ids,
#             max_length=30,
#             num_beams=5,
#             early_stopping=True
#         )
#     text =  t5_tokenizer.decode(outputs[0], skip_special_tokens=True)
#     return text.strip('<pad>').strip()

@app.get("/suggest")
def suggest(prefix: str = Query(...), model: str = Query("gpt2", enum=["gpt2", "t5"])):
    # return {"suggestions": "not enabled"}
    prompt = f"Continue this email in a helpful tone and stop after end of sentence: {prefix}"
    
    suggestion = gpt2_autocomplete(prompt) # if model == "gpt2" else t5_autocomplete(prompt)
    print(f"input - {prefix} suggested- {suggestion}")
    return {"suggestion": suggestion}

if __name__ == "__main__":
    import uvicorn
    uvicorn.run("app:app", host="0.0.0.0", port=8000, reload=True)