from flask import Flask, request, jsonify
from model import load_model, predict

app = Flask(__name__)
model = load_model()

@app.route('/predict', methods=['POST'])
def predict_route():
    try:
        text = request.json.get('data')
        if not text:
            return jsonify({"error": "No input data provided"}), 400
        result = predict(model, text)
        return jsonify({"output": result})
    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=6000)
