#!/bin/bash

echo "Setting up virtual environment..."
python3 -m venv venv
source venv/bin/activate

echo "Installing requirements..."
pip install -r requirements.txt

echo "Creating data and model folders..."
mkdir -p data model scripts api

echo "Creating version tracker..."
echo 0 > model/version.txt

echo "Setup complete. You're ready to fine-tune GPT-2!"
