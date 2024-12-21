from flask import Flask, request, jsonify
import cv2
import easyocr
import requests
import numpy as np
import os

app = Flask(__name__)

# Initialize EasyOCR reader
reader = easyocr.Reader(['en'])

@app.route('/extract-text', methods=['POST'])
def extract_text():
    try:
        # Get the JSON data from the request
        data = request.get_json()

        # Extract image URL and bounding box coordinates from the request data
        img_url = data.get('img_url')
        x = int(data.get('x'))
        y = int(data.get('y'))
        w = int(data.get('width'))
        h = int(data.get('height'))

        # Validate the image URL
        if not img_url:
            return jsonify({"error": "Image URL is required"}), 400
        
        # Download the image from the URL
        img_data = requests.get(img_url).content
        img_array = np.frombuffer(img_data, np.uint8)
        image = cv2.imdecode(img_array, cv2.IMREAD_COLOR)

        # Check if the image was loaded successfully
        if image is None:
            return jsonify({"error": "Failed to load image from URL"}), 400

        # Crop the image using the bounding box coordinates
        cropped_img = image[y:y+h, x:x+w]

        # Extract text (e.g., number plate) from the cropped image
        result = reader.readtext(cropped_img)

        # Prepare the response with the detected text
        detected_text = [detection[1] for detection in result]

        return jsonify({"detected_text": detected_text})

    except Exception as e:
        return jsonify({"error": str(e)}), 500

if __name__ == '__main__':
    app.run(debug=True)
+--