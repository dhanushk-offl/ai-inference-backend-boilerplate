from transformers import pipeline

def load_model():
    # Load a sentiment-analysis pipeline using a pre-trained model
    return pipeline("sentiment-analysis", model="distilbert-base-uncased-finetuned-sst-2-english")

def predict(model, text):
    return model(text)[0]  # return first result (label and score)
