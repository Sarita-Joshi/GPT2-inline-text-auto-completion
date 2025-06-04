import os
from transformers import (
    GPT2LMHeadModel,
    GPT2Tokenizer,
    TextDataset,
    DataCollatorForLanguageModeling,
    Trainer,
    TrainingArguments,
)
import datetime

model_name = "distilgpt2"
timestamp = datetime.datetime.now().strftime("%Y%m%d_%H%M%S")
output_dir = f"../model/fine-tuned-{timestamp}"

# Load model and tokenizer
tokenizer = GPT2Tokenizer.from_pretrained(model_name)
tokenizer.pad_token = tokenizer.eos_token  # required
model = GPT2LMHeadModel.from_pretrained(model_name)

# Load dataset
dataset = TextDataset(
    tokenizer=tokenizer,
    file_path="../data/accepted_emails.txt",
    block_size=128,
)

data_collator = DataCollatorForLanguageModeling(tokenizer=tokenizer, mlm=False)

training_args = TrainingArguments(
    output_dir=output_dir,
    overwrite_output_dir=True,
    num_train_epochs=3,
    per_device_train_batch_size=4,
    save_steps=500,
    save_total_limit=2,
    logging_steps=50,
    prediction_loss_only=True,
    report_to="none",
)

trainer = Trainer(
    model=model,
    args=training_args,
    data_collator=data_collator,
    train_dataset=dataset,
)

trainer.train()

# Save model
trainer.save_model(output_dir)
tokenizer.save_pretrained(output_dir)

print(f"✅ Model saved at {output_dir}")
