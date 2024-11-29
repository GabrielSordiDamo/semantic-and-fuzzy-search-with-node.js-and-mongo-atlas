import sys
import json
from sentence_transformers import SentenceTransformer

def generate_embeddings(input_texts):
    model = SentenceTransformer('all-MiniLM-L6-v2')
    embeddings = model.encode(input_texts, convert_to_numpy=True).tolist()
    return embeddings

if __name__ == "__main__":
    input_texts = json.loads(sys.stdin.read())
    embeddings = generate_embeddings(input_texts)
    print(json.dumps(embeddings))
