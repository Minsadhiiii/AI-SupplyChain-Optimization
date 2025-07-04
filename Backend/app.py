from flask import Flask, request, jsonify
from flask_cors import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS to allow frontend access

@app.route('/')
def home():
    return "✅ AI Supply Chain Backend is running!"

if __name__ == '__main__':
    app.run(debug=True)