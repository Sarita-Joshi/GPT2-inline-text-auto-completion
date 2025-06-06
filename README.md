# Smart Email Autocomplete using GPT-2 and T5

This project replicates the inline autocomplete experience popularized by Gmail’s Smart Compose. It predicts and suggests text completions as the user types, using two different types of language models: GPT-2 and T5-small.

The goal is to explore the trade-offs between causal and seq2seq models for text generation tasks like email composition under real-world constraints (e.g., limited compute, local inference, lightweight models).

## Demo

<video width="100%" controls>
  <source src="demo.mp4" type="video/mp4">
  Your browser does not support the video tag.
</video>

## Features

Gmail's Smart Compose offers inline suggestions based on the user’s writing context. The experience is subtle: suggestions appear in faded text, can be accepted by pressing `Tab`, and help save time in repetitive or predictable communication.

This project recreates that behavior with the following features:

- Inline, real-time suggestions as you type
- Accept suggestions using `Tab`
- Cancel suggestions using `Backspace` or `Escape`
- Prevents suggestions after common email closings (e.g., "Thanks", "Regards")
- Allows switching between `GPT-2` (causal) and `T5-small` (seq2seq) models for experimentation
- Highlights usability considerations for autocomplete UI components (cursor positioning, overlay rendering)

## Why GPT-2 and T5?

- **GPT-2** is a left-to-right autoregressive model. It's great for continuation tasks like autocomplete, where the model predicts the next word given a prefix.
- **T5** is a sequence-to-sequence model. It's traditionally used for translation and summarization but can be adapted for completion by framing it as a text-to-text task (e.g., `complete: Your input here`).
- Exploring both helps compare generation behavior in lightweight models, especially under constrained settings.

## Computational Constraints & Design Decisions

- This project is designed to run **locally** on **laptops or free-tier cloud VMs**.
- Only **lightweight models** are used:
  - `distilgpt2` (~328MB)
  - `t5-small` (~242MB)
- The dataset for evaluation is implicit (email-style phrases during testing), and no model training or fine-tuning is performed.
- API latency and memory footprint were key concerns — prompting efficient token usage, caching, and early suggestion cutoffs.

## Fine-Tuning on Enron Email Dataset

To improve the quality and relevance of completions, both models were fine-tuned on a cleaned and preprocessed version of the **Enron Email Dataset**.

### Preprocessing Steps Included:

- Removed signatures, disclaimers, HTML tags, and non-conversational headers
- Normalized whitespace, corrected casing, and removed duplicated content
- Extracted useful conversational sentences for completion context (forward/reply cleanup)
- Tokenized and filtered samples based on length and structure
- Constructed prefix–target pairs for T5 and prefix-only sequences for GPT-2

### Sentence Pair Generation

**GPT-2 (causal):** Used sliding windows over emails to generate overlapping token-based prefixes for left-to-right generation.

**T5-small (seq2seq):** Split into full sentence boundaries and transformed into input–output pairs using a “complete:” prefix.

### Chunking Example

```
Full sentence: "Let me know if you are available for a quick sync tomorrow."

GPT-2 prefix samples:
- "Let me know"
- "Let me know if you are"
- "Let me know if you are available for"

T5 input/target:
- Input: "complete: Let me know if"
- Target: "you are available for a quick sync tomorrow."
```

### Sampling and Filtering

- Prioritized informative, conversational lines over noise
- Avoided repeated phrases and auto-generated content
- Applied heuristics for minimal and clean completions

## What I Learned

- Fine-tuning on domain-specific data massively improves suggestion quality
- GPT-2 is more naturally suited to autocomplete, while T5 needs training
- Inline suggestion UX requires careful management of cursor, spacing, and cancellation triggers
- Memory and latency constraints shaped many architecture choices

## Tech Stack

- **Frontend**: React, Tailwind CSS, TypeScript
- **Backend**: FastAPI, Transformers, Uvicorn
- **Models**: `distilgpt2` and `t5-small` from Hugging Face

## Getting Started

### Backend Setup

```bash
cd backend
python -m venv venv
# Windows:
venv\Scripts\activate
# macOS/Linux:
source venv/bin/activate
pip install -r requirements.txt
uvicorn app:app --host 0.0.0.0 --port 8000
```

### Frontend Setup

```bash
cd frontend
npm install
npm run dev
```

Visit [http://localhost:5173](http://localhost:5173)

## Troubleshooting

| Problem                                | Fix                                                                 |
|----------------------------------------|----------------------------------------------------------------------|
| `sentencepiece` import error           | Run: `pip install --force-reinstall sentencepiece`                  |
| T5 tokenizer not loading               | Ensure `sentencepiece` is installed and you're in the right venv    |
| Model not loading on Hugging Face      | Use `huggingface-cli login`, check repo name and permissions        |
| Render app crashes on boot             | Reduce RAM usage, try loading one model at a time                   |
| spaces formatting after accepting suggestion  | Handled with logic to trim double space between content & suggestion |


## API Endpoint sample

| Method | Endpoint            | Description                  |
|--------|---------------------|------------------------------|
| GET   | `/suggest?model=gpt2&prefix=`         | GPT-2 based autocomplete     |
| POST   | `/suggest?model=t5&prefix=`  | T5-small based autocomplete  |

