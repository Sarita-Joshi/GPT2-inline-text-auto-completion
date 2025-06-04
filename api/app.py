
from fastapi import FastAPI, Query
from fastapi.middleware.cors import CORSMiddleware
from transformers import AutoTokenizer, AutoModelForCausalLM
import torch

# Load fine-tuned model
device = torch.device("cuda" if torch.cuda.is_available() else "cpu")
model_path = r"C:\Users\Admin\OneDrive\Documents\Repos\GPT2-inline-text-auto-completion\model\fine-tuned-20250602_195117"  # point to your saved model folder
model = AutoModelForCausalLM.from_pretrained(model_path)
model = model.to(device)
tokenizer = AutoTokenizer.from_pretrained(model_path)
model.eval()

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

@app.get("/suggest")
def suggest(prefix: str = Query(...), style: str = Query("")):
    prompt = f"Continue this email in a helpful tone and stop after end of sentence: {prefix}"
    inputs = tokenizer(prompt, return_tensors="pt").to(device)

    with torch.no_grad():
        outputs = model.generate(
            inputs["input_ids"],
            attention_mask=inputs["attention_mask"],
            pad_token_id=tokenizer.eos_token_id,
            max_new_tokens=5,
            do_sample=False,         
            top_k=30,
            top_p=0.9,
            temperature=0.5,
            repetition_penalty=1.1
        )

    full_text = tokenizer.decode(outputs[0], skip_special_tokens=True)
    suggestion = full_text[len(prompt):].strip()
    print(f"input - {prefix} suggested- {suggestion}")
    return {"suggestion": suggestion}